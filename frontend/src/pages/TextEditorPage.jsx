import React from 'react';
import TextEditor from '../components/TextEditor';
import Navbar from '../components/Navbar';

const TextEditorPage = () => {
    return (
        <>
        <Navbar />
        <div className= "">
            <TextEditor />
        </div> 
        </>
    );
};

export default TextEditorPage;
