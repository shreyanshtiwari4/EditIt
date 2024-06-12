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
        <div className="navbar flex justify-between items-center p-4 bg-gray-800 text-black">
            <Link to="/" className="text-lg font-bold text-black">
                EditIt
            </Link>
            {userInfo && (
                <div className="flex items-center">
                    <span className="text-black mr-4">{userInfo.username}</span>
                    <div className="profileMain relative">
                        <div className="profile w-10 h-10 rounded-full overflow-hidden cursor-pointer" onClick={() => setShowUserInfo(!showUserInfo)}>
                            <img src={avatarUrl || userInfo?.avatarURL} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        {showUserInfo && (
                            <div className="profileInfo absolute top-12 right-0 bg-white rounded shadow-md p-2 text-black">
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
                                    <button onClick={handleLogout} className="w-full px-4 py-2 bg-green-500 text-black rounded">
                                        Log out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
