import React, { useState } from 'react';
import Sidebar from '../Components/SiderBar';
import axios from 'axios';

const AddQuestion = () => {
    const [quizTitle, setQuizTitle] = useState('');
    const [percentage, setPercentage] = useState('');
    const [testDuration, setTestDuration] = useState('');
    const [questions, setQuestions] = useState([]); // Array to store questions and options

    const [errors, setErrors] = useState({}); // Track validation errors
    const apiUrl="http://localhost:5000/api/addquiz/question";

    const handleBackButton = () => {
        window.history.back();
    };

    const handleAddTest = () => {
        // Validate form fields
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            // If no errors, submit the form
            const quiz={
                quizTitle:quizTitle,
                percentage:percentage,
                testDuration:testDuration,
                questions:questions
            }
            console.log(quiz);
            try {

                axios.post(apiUrl,{...quiz}).then(res=>{
                console.log(res.data);
                alert(res.data.message);
               
                })
                
            } catch (error) {
                
            }

            
        } else {
            // If there are errors, update the errors state
            setErrors(validationErrors);
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!quizTitle.trim()) {
            errors.quizTitle = 'Quiz Title is required';
        }
        if (!percentage.trim()) {
            errors.percentage = 'Qualification Percentage is required';
        }
        if (!testDuration.trim()) {
            errors.testDuration = 'Test Duration is required';
        }

        if (questions.length === 0) {
            errors.questions = 'At least one question is required.';
        } else {
            questions.forEach((question, index) => {
                if (!question.question.trim()) {
                    errors[`question-${index}`] = `Question ${index + 1} cannot be empty.`;
                }
                question.options.forEach((option, optionIndex) => {
                    if (!option.trim()) {
                        errors[`option-${index}-${optionIndex}`] = `Option ${
                            optionIndex + 1
                        } for Question ${index + 1} cannot be empty.`;
                    }
                });
            });
        }

        return errors;
    };

    const handleAddQuestionSet = () => {
        setQuestions([...questions, { question: '', options: ['', '', '', ''] }]);
    };

    const handleDeleteQuestionSet = (index) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-r from-gray-100 via-white to-gray-100">
            {/* Sidebar */}
            <div className="">
                <Sidebar/>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Back Button */}
                <div className="mb-6">
                    <button
                        onClick={handleBackButton}
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded shadow-md hover:bg-red-500 transition-all duration-200"
                    >
                        ← Back
                    </button>
                </div>

                {/* Form Container */}
                <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-2xl">
                    <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">Create a New Test</h1>

                    {/* Quiz Title */}
                    <div className="mb-6">
                        <label htmlFor="quiz-title" className="block text-gray-700 font-medium">
                            Quiz Title
                        </label>
                        <input
                            type="text"
                            id="quiz-title"
                            placeholder="Enter quiz title"
                            className={`w-full mt-2 px-4 py-2 border ${
                                errors.quizTitle ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:ring-2 ${
                                errors.quizTitle ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                            }`}
                            value={quizTitle}
                            onChange={(e) => setQuizTitle(e.target.value)}
                        />
                        {errors.quizTitle && (
                            <p className="text-red-500 text-sm mt-1">{errors.quizTitle}</p>
                        )}
                    </div>

                    {/* Percentage for Qualification */}
                    <div className="mb-6">
                        <label htmlFor="percentage" className="block text-gray-700 font-medium">
                            Qualification Percentage
                        </label>
                        <input
                            type="number"
                            id="percentage"
                            placeholder="Enter qualification percentage"
                            className={`w-full mt-2 px-4 py-2 border ${
                                errors.percentage ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:ring-2 ${
                                errors.percentage ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                            }`}
                            value={percentage}
                            onChange={(e) => setPercentage(e.target.value)}
                        />
                        {errors.percentage && (
                            <p className="text-red-500 text-sm mt-1">{errors.percentage}</p>
                        )}
                    </div>

                    {/* Test Duration */}
                    <div className="mb-6">
                        <label htmlFor="test-duration" className="block text-gray-700 font-medium">
                            Test Duration (Minutes)
                        </label>
                        <input
                            type="number"
                            id="test-duration"
                            placeholder="Enter duration in minutes"
                            className={`w-full mt-2 px-4 py-2 border ${
                                errors.testDuration ? 'border-red-500' : 'border-gray-300'
                            } rounded-lg focus:outline-none focus:ring-2 ${
                                errors.testDuration ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                            }`}
                            value={testDuration}
                            onChange={(e) => setTestDuration(e.target.value)}
                        />
                        {errors.testDuration && (
                            <p className="text-red-500 text-sm mt-1">{errors.testDuration}</p>
                        )}
                    </div>

                    {/* Render Questions */}
                    {questions.map((question, questionIndex) => (
                        <div
                            key={questionIndex}
                            className="mb-6 p-4 border rounded-lg bg-gray-100 relative"
                        >
                            {/* Delete Button */}
                            <button
                                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                                onClick={() => handleDeleteQuestionSet(questionIndex)}
                                title="Delete Question"
                            >
                                ✖
                            </button>

                            <label className="block text-gray-700 font-medium mb-2">
                                Question {questionIndex + 1}
                            </label>
                            <input
                                type="text"
                                placeholder="Enter question"
                                className={`w-full mb-4 px-4 py-2 border ${
                                    errors[`question-${questionIndex}`]
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 ${
                                    errors[`question-${questionIndex}`]
                                        ? 'focus:ring-red-500'
                                        : 'focus:ring-blue-500'
                                }`}
                                value={question.question}
                                onChange={(e) =>
                                    handleQuestionChange(questionIndex, e.target.value)
                                }
                            />
                            {errors[`question-${questionIndex}`] && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors[`question-${questionIndex}`]}
                                </p>
                            )}

                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="mb-2">
                                    <input
                                        type="text"
                                        placeholder={`Option ${optionIndex + 1}`}
                                        className={`w-full px-4 py-2 border ${
                                            errors[`option-${questionIndex}-${optionIndex}`]
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        } rounded-lg focus:outline-none focus:ring-2 ${
                                            errors[`option-${questionIndex}-${optionIndex}`]
                                                ? 'focus:ring-red-500'
                                                : 'focus:ring-blue-500'
                                        }`}
                                        value={option}
                                        onChange={(e) =>
                                            handleOptionChange(
                                                questionIndex,
                                                optionIndex,
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors[`option-${questionIndex}-${optionIndex}`] && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors[`option-${questionIndex}-${optionIndex}`]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Add Question Set Button */}
                    <div className="flex justify-center mb-8">
                        <button
                            onClick={handleAddQuestionSet}
                            className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-500 transition-all duration-200"
                        >
                            Add Question Set
                        </button>
                    </div>

                    {/* Add Test Button */}
                    <div className="text-center">
                        <button
                            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-all duration-200 shadow-md"
                            onClick={handleAddTest}
                        >
                            Add Test
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddQuestion;
