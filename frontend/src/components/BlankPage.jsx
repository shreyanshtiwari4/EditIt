import React from 'react';

const BlankPage = ( props ) => {
    return (
        <div className="cursor-pointer p-4 bg-white rounded shadow hover:bg-gray-100">
            <h3 className="text-xl font-semibold">{props.content}</h3>
        </div>
    );
};

export default BlankPage;
