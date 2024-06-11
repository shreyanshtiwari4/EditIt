import React from 'react';
import CodeEditor from '../components/CodeEditor';
import Navbar from '../components/Navbar';

const CodeEditorPage = () => {
    return (
        <>
        <Navbar />
        <div className="fixed inset-0 bg-white z-50">
            <CodeEditor />
        </div>
        </>
    );
};

export default CodeEditorPage;
