import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = 'http://localhost:8888/api/auth';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${API_URL}/me`, { headers: { Authorization: `Bearer ${token}` } })
                .then(response => setUser(response.data))
                .catch(() => setUser(null));
        }
    }, []);

    const login = async (identifier, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { identifier, password });
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
        } catch (error) {
            console.error('Failed to login', error);
            throw error;
        }
    };

    const signup = async (username, email, password) => {
        try {
            const response = await axios.post(`${API_URL}/signup`, { username, email, password });
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
        } catch (error) {
            console.error('Failed to signup', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
