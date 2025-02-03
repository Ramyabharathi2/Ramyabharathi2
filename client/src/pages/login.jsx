import React, { useState } from 'react';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', mobile: '' });
    const [message, setMessage] = useState({ text: '', type: '' });
    const navigate = useNavigate(); // Initialize navigate
    
    // console.log(JSON.parse(localStorage.getItem("userData")));
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin
            ? 'http://localhost:5000/login'
            : 'http://localhost:5000/signup';

        try {
            const response = await axios.post(url, formData);
            console.log(response.data);
            
           if(response.data.message==="Login successful!"){
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("userData",JSON.stringify(response.data.data))

                // localStorage.setItem("userData")
               setMessage({ text: response.data.message, type: 'success' }); // Success Message
               navigate('/dashboard');

           } else {
            // Reset form for signup
            setFormData({ name: '', email: '', password: '', mobile: '' });
        }
        
        } catch (err) {
            setMessage({ text: err.response?.data?.message || 'Something went wrong!', type: 'error' }); // Error Message
        }
    };

    // console.log(JSON.parse(localStorage.getItem("userData")));

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">
                {isLogin ? 'Employe Login' : 'Employe Signup'}
            </h1>

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
                className="max-w-md mx-auto bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4"
            >
                {!isLogin && (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required={!isLogin}
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
                                required={!isLogin}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your mobile number"
                            />
                        </div>
                    </>
                )}
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
                        {isLogin ? 'Login' : 'Signup'}
                    </button>
                </div>
            </form>
            <div className="text-center">
                <button
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setMessage({ text: '', type: '' });
                    }}
                    className="text-blue-500 hover:text-blue-700"
                >
                    {isLogin ? "Don't have an account? Signup" : 'Already have an account? Login'}
                </button>
            </div>
        </div>
    );
};

export default Login;
