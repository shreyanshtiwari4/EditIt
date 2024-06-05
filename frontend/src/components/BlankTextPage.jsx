import React from 'react';

const BlankTextPage = ({ onClick }) => {
    return (
        <div onClick={onClick} className="cursor-pointer p-4 bg-white rounded shadow hover:bg-gray-100">
            <h3 className="text-xl font-semibold">Start Blank Text File</h3>
        </div>
    );
};

export default BlankTextPage;
