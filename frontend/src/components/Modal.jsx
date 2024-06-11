import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onCreate, docType }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(title);
        setTitle('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Create New {docType} Document</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Document Title" 
                        className="w-full p-2 mb-4 border rounded-md"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="flex justify-end">
                        <button 
                            type="button" 
                            className="bg-gray-300 px-4 py-2 rounded-md mr-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
