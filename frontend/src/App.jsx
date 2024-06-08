import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import TextEditorPage from './pages/TextEditorPage';
import CodeEditorPage from './pages/CodeEditorPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { v4 as uuid } from 'uuid';
import "./App.css";
import AuthProvider from './context/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/" element={<SignUp />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/text-editor" element={<Navigate to={`/text-editor/${uuid()}`} />} />
                    <Route path="/text-editor/:id" element={<TextEditorPage />} />
                    <Route path="/code-editor" element={<CodeEditorPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
