import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TextEditorPage from './pages/TextEditorPage';
import CodeEditorPage from './pages/CodeEditorPage';
import "./App.css"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/text-editor" element={<TextEditorPage/>} />
                <Route path="/code-editor" element={<CodeEditorPage/>} />
            </Routes>
        </Router>    
    );
};

export default App;
