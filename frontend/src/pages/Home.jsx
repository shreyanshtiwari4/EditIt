import React from 'react';
import TextEditor from '../components/TextEditor';
import CodeEditor from '../components/CodeEditor';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-3xl font-bold mb-6">Google Docs Clone</h1>
            <button className="mb-8 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
                Start New Document
            </button>
            <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-semibold mb-4">Document Types</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextEditor />
                    <CodeEditor />
                </div>
            </div>
        </div>
    );
};

export default Home;