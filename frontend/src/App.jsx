import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TextEditorPage from './pages/TextEditorPage';
import CodeEditorPage from './pages/CodeEditorPage';
import "./App.css"
import  { v4 as uuid} from 'uuid';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/text-editor" element={<Navigate to={`/text-editor/${uuid()}`} /> } />
                <Route path="/text-editor/:id" element={<TextEditorPage/>} />
                <Route path="/code-editor" element={<CodeEditorPage/>} />
            </Routes>
        </Router>    
    );
};

export default App;
