import React from 'react';

const BlankPage = ({ content }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-lg font-medium text-gray-700">{content}</div>
        </div>
    );
};

export default BlankPage;
