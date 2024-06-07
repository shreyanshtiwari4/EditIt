import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlankPage from '../components/BlankPage';
import Modal from '../components/Modal';
import axios from 'axios'

const Home = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const navigate = useNavigate();

    const openTextModal = () => {
        setModalOpen(true);
        setModalType('Text');
    };

    const openCodeModal = () => {
        setModalOpen(true);
        setModalType('Code');
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalType('');
    };

    const createDocument = async (title) => {
        const type = modalType.toLowerCase();
        try {
            const response = await axios.post('http://localhost:8888/api/document/create', {
                title,
                type,
            });
            console.log(response);
            navigate(`/text-editor/${response.data._id}`);
        } catch (error) {
            console.error("There was an error creating the document!", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-3xl font-bold mb-6">EditIt - Your own text and code editor</h1>
            <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-semibold mb-4">Document Types</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div onClick={openTextModal}>
                        <BlankPage content="Blank Text Doc" />
                    </div>
                    <div onClick={openCodeModal}>
                        <BlankPage content="Blank Code Editor" />
                    </div>
                </div>
            </div>
            <Modal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                onCreate={createDocument} 
                docType={modalType}
            />
        </div>
    );
};

export default Home;
