// Modal.js
import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onCreate, docType }) => {
    const [title, setTitle] = useState('');

    const handleCreate = () => {
        onCreate(title);
        setTitle('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white p-8 rounded shadow-md w-96 relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                    &times;
                </button>
                <h2 className="text-2xl font-semibold mb-4">Create New {docType} Document</h2>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 p-2 mb-4"
                    placeholder="Document Title"
                />
                <div className="flex justify-end">
                    <button onClick={handleCreate} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
                        Create
                    </button>
                    <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
