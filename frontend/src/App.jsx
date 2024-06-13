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
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from './store/slices/authSlice.jsx';
import { useEffect } from 'react';

const App = () => {

    const dispatch = useDispatch();
    const isLogged = (state) => {
        return state.auth.isLogged;
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Get JWT token from local storage (assuming it's stored there after login)
                const token = localStorage.getItem('token');

                if (!token) {
                    throw new Error('No token found');
                }

                // Make API call to backend to get user data
                const response = await axios.get('http://localhost:8888/api/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}` // Attach JWT token to the request
                    }
                });

                // setUserData(response.data);
                dispatch(authActions.login({ user: response.data }));
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();

        
    }, []);


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
