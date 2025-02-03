import React, { useState } from 'react';
import Sidebar from '../Components/SiderBar';

const ImportIQ = () => {
    const [quizTitle, setQuizTitle] = useState('');
    const [percentage, setPercentage] = useState('');
    const [testDuration, setTestDuration] = useState('');
    const [file, setFile] = useState(null);

    const handleBackButton = () => {
        window.history.back();
    };

    const handleAddTest = () => {
        alert('Test added successfully!');
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-gray-100">
            {/* Sidebar */}
            <div className="w-72 bg-blue-900 text-white">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {/* Back Button */}
                <div className="mb-6">
                    <button
                        onClick={handleBackButton}
                        className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded shadow hover:bg-red-600 transition ease-in-out duration-200"
                    >
                        ← Back
                    </button>
                </div>

                {/* Form Container */}
                <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-2xl">
                    <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Create a New Test</h1>

                    {/* Quiz Title */}
                    <div className="mb-6">
                        <label htmlFor="quiz-title" className="block text-lg font-medium text-gray-700">
                            Quiz Title
                        </label>
                        <input
                            type="text"
                            id="quiz-title"
                            placeholder="Enter quiz title"
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)}
                        />
                    </div>

                    {/* Percentage for Qualification */}
                    <div className="mb-6">
                        <label htmlFor="percentage" className="block text-lg font-medium text-gray-700">
                            Qualification Percentage
                        </label>
                        <input
                            type="number"
                            id="percentage"
                            placeholder="Enter percentage"
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={percentage}
                            onChange={(e) => setPercentage(e.target.value)}
                        />
                    </div>

                    {/* Test Duration */}
                    <div className="mb-6">
                        <label htmlFor="test-duration" className="block text-lg font-medium text-gray-700">
                            Test Duration (Minutes)
                        </label>
                        <input
                            type="number"
                            id="test-duration"
                            placeholder="Enter test duration"
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={testDuration}
                            onChange={(e) => setTestDuration(e.target.value)}
                        />
                    </div>

                    {/* File Upload */}
                    <div className="mb-6">
                        <label htmlFor="file-upload" className="block text-lg font-medium text-gray-700">
                            Upload Questions (Optional)
                        </label>
                        <div className="flex items-center mt-2">
                            <input
                                type="file"
                                id="file-upload"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                  

                    {/* Add Test Button */}
                    <div className="text-center">
                        <button
                            onClick={handleAddTest}
                            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition ease-in-out duration-200 shadow-md"
                        >
                            Add Test
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportIQ;
