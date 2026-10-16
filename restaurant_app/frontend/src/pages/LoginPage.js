import React, { useState } from 'react';
import { api } from '../api';

const LoginPage = ({ onLoginSuccess }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.login(credentials);
            localStorage.setItem('token', res.data.access_token);
            onLoginSuccess();
            alert("Tizimga muvaffaqiyatli kirdingiz!");
        } catch (err) {
            alert("Login yoki parol xato!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Kirish</h2>
                <input
                    type="text" placeholder="Username" className="w-full border p-2 mb-4 rounded"
                    value={credentials.username} onChange={e => setCredentials({...credentials, username: e.target.value})}
                />
                <input
                    type="password" placeholder="Parol" className="w-full border p-2 mb-6 rounded"
                    value={credentials.password} onChange={e => setCredentials({...credentials, password: e.target.value})}
                />
                <button type="submit" className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition">Kirish</button>
            </form>
        </div>
    );
};

export default LoginPage;
