import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', mobile: '' });
    const [message, setMessage] = useState({ text: '', type: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation
        if (!formData.name || formData.name.length < 2) {
            setMessage({ text: 'Name must be at least 2 characters long!', type: 'error' });
            return;
        }

        if (!formData.mobile) {
            setMessage({ text: 'Mobile number is required!', type: 'error' });
            return;
        }

        if (!formData.email) {
            setMessage({ text: 'Email is required!', type: 'error' });
            return;
        }

        if (!formData.password || formData.password.length < 8) {
            setMessage({ text: 'Password must be at least 8 characters long!', type: 'error' });
            return;
        }

        const url = 'http://localhost:5000/signup';

        try {
            const response = await axios.post(url, formData);
            setMessage({ text: response.data.message, type: 'success' }); // Success Message

            // Reset form after successful signup
            setFormData({ name: '', email: '', password: '', mobile: '' });

            // Redirect to login page after signup
            navigate('/login');
        } catch (err) {
            setMessage({ text: err.response?.data?.message || 'Something went wrong!', type: 'error' });
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Employee Signup</h1>

            {message.text && (
                <div
                    className={`text-center mb-4 ${
                        message.type === 'success' ? 'text-green-500' : 'text-red-500'
                    }`}
                >
                    {message.text}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your name"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
                        Mobile Number
                    </label>
                    <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your mobile number"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your password"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Signup
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
