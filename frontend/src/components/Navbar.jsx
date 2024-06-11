import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsCameraFill } from 'react-icons/bs';
import axios from 'axios';

const updateProfile = async (imgLink) => {
    if (!imgLink) return;

    try {
        const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/profile`, {
            method: 'PATCH',
            body: JSON.stringify({ avatarURL: imgLink }),
            headers: {
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem("TOKEN")
            }
        });

        const data = await res.json();

        if (res.status === 401) {
            sessionStorage.clear();
            alert(`Session Expired! \nPlease Login again.. ${window.location.replace('/auth') || ""}`);
            return;
        }

        if (res.ok) {
            const userInfo = JSON.parse(sessionStorage.getItem("USER"));
            const newUserInfo = { ...userInfo, avatarURL: imgLink };
            sessionStorage.setItem("USER", JSON.stringify(newUserInfo));
        }

        alert(data.message);
    } catch (error) {
        console.log('error:', error);
        alert(error.message);
    }
};

function Navbar() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("USER")) || "");
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);

    const openModal = useCallback(() => {
        setIsOpenModal(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpenModal(false);
    }, []);

    const handleCreateDoc = useCallback((e) => {
        e.preventDefault();
        const doc = { title: e.target.title.value };
        const isPbulicVal = e.target.isPublic.checked;
        if (isPbulicVal) doc.isPublic = isPbulicVal;

        // Simulate document creation and close the modal
        closeModal();
        navigate(`/docs/${Math.random().toString(36).substring(7)}`);
    }, [navigate, closeModal]);

    const handleLogout = useCallback(() => {
        sessionStorage.clear();
        navigate('/login');
    }, [navigate]);

    const imageUpload = useCallback(async (e) => {
        const imgFile = e.target.files[0];
        if (!imgFile) return;
        if (imgFile.size > 2097152) return alert("Please upload image with less than 2MB size");

        setLoading(true);

        try {
            const data = new FormData();
            data.append("file", imgFile);
            data.append("upload_preset", import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET);
            data.append("cloud_name", import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME);

            const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, data);

            setAvatarUrl(res.data.secure_url);
            updateProfile(res.data.secure_url);
            setLoading(false);
        } catch (error) {
            console.log('error:', error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (userInfo.username) setUserInfo(userInfo);
    }, [userInfo]);

    return (
        <div className="navbar flex justify-between items-center p-4 bg-gray-800 text-white">
            <Link to="/" className="text-lg font-bold">
                MyApp
            </Link>
            <ul className="flex list-none">
                <li className="mr-4">
                    <button onClick={openModal} className="createDoc px-4 py-2 bg-green-500 text-white rounded">
                        Create Doc +
                    </button>
                </li>
                <li>
                    {userInfo ? (
                        <div className="profileMain relative">
                            <div className="profile w-10 h-10 rounded-full overflow-hidden cursor-pointer" onClick={() => setShowUserInfo(!showUserInfo)}>
                                <img src={avatarUrl || userInfo?.avatarURL} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            {showUserInfo && (
                                <div className="profileInfo absolute top-12 right-0 bg-white rounded shadow-md p-2">
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-20 h-20 mb-4">
                                            <img src={avatarUrl || userInfo?.avatarURL} alt="Profile" className="w-full h-full object-cover rounded-full" />
                                            {loading && (
                                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
                                                    <p>Wait...</p>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100">
                                                <input type="file" id="profile-upload" className="absolute inset-0 opacity-0 cursor-pointer" onChange={imageUpload} />
                                                <label htmlFor="profile-upload" className="text-white">
                                                    <BsCameraFill />
                                                </label>
                                            </div>
                                        </div>
                                        <figcaption className="text-center mb-4">{userInfo.username}</figcaption>
                                        <button onClick={handleLogout} className="w-full px-4 py-2 bg-green-500 text-white rounded">
                                            Log out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="px-4 py-2 bg-green-500 text-white rounded">
                                Login
                            </button>
                        </Link>
                    )}
                </li>
            </ul>
            {isOpenModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded">
                        <h2 className="text-xl mb-4">Create Document</h2>
                        <form className="flex flex-col" onSubmit={handleCreateDoc}>
                            <div className="flex flex-col mb-4">
                                <input id="title" type="text" required className="p-2 border rounded" />
                                <label htmlFor="title" className="text-sm text-gray-700 mt-1">Title</label>
                            </div>
                            <div className="flex items-center mb-4">
                                <input id="isPublic" type="checkbox" className="mr-2" />
                                <label htmlFor="isPublic" className="text-sm text-gray-700">Make it 🌎 Public</label>
                            </div>
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                                Create Document
                            </button>
                        </form>
                        <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
