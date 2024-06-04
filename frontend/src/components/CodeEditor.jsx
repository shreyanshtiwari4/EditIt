import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
    return (
        <div className="p-6 bg-white rounded shadow h-96">
            <h3 className="text-xl font-semibold mb-4">Code Editor</h3>
            <Editor 
                height="100%" 
                defaultLanguage="javascript" 
                defaultValue="// Start coding..." 
                theme="vs-dark"
            />
        </div>
    );
};

export default CodeEditor;
