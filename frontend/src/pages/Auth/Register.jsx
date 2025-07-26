import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const Register = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('/api/auth/register', formData);
            login(res.data); // auto-login after register
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-black px-4">
            <div className="bg-white dark:bg-gray-900 text-gray-100 w-full max-w-md p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Register for ChoreChooser</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex items-center bg-gray-800 p-3 rounded-lg">
                        <FaUser className="mr-2 text-gray-400" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-transparent outline-none flex-1 text-white"
                            required
                        />
                    </div>

                    <div className="flex items-center bg-gray-800 p-3 rounded-lg">
                        <FaEnvelope className="mr-2 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-transparent outline-none flex-1 text-white"
                            required
                        />
                    </div>

                    <div className="flex items-center bg-gray-800 p-3 rounded-lg">
                        <FaLock className="mr-2 text-gray-400" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="bg-transparent outline-none flex-1 text-white"
                            required
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-all"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-4">
                    Already have an account? <a href="/login" className="text-blue-400 underline">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
