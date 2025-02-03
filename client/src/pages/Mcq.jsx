import React, { useState } from "react";
import Sidebar from "../Components/SiderBar";

const MCQManager = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", ""]);
  const [isMultiSelect, setIsMultiSelect] = useState(false); // Toggle for multiple-choice

  // Handle adding a new question
  const addQuestion = () => {
    if (newQuestion.trim() === "" || newOptions.some(option => option.trim() === "")) {
      alert("Please fill in the question and all options.");
      return;
    }

    const newQuestionData = {
      id: Date.now(),
      question: newQuestion,
      options: newOptions,
      isMultiSelect,
    };

    setQuestions([...questions, newQuestionData]);
    setNewQuestion("");
    setNewOptions(["", ""]);
    setIsMultiSelect(false);
  };

  // Handle deleting a question
  const deleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Handle editing a question
  const editQuestion = (id) => {
    const questionToEdit = questions.find((q) => q.id === id);
    setNewQuestion(questionToEdit.question);
    setNewOptions(questionToEdit.options);
    setIsMultiSelect(questionToEdit.isMultiSelect);

    // Remove the question to replace it on save
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Add a new option field
  const addOption = () => {
    setNewOptions([...newOptions, ""]);
  };

  // Remove an option field
  const removeOption = (index) => {
    setNewOptions(newOptions.filter((_, i) => i !== index));
  };

  // Update option text
  const updateOption = (index, value) => {
    const updatedOptions = [...newOptions];
    updatedOptions[index] = value;
    setNewOptions(updatedOptions);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>

      {/* MCQ Manager Section */}
      <div className="p-8 w-full max-w-5xl mx-auto">
        <div className="bg-white shadow-md rounded-md p-6">
          <h1 className="text-2xl font-bold mb-4">MCQ Manager</h1>

          {/* Question Count */}
          <div className="mb-4">
            <p className="text-gray-700">
              Total Questions: <span className="font-bold">{questions.length}</span>
            </p>
          </div>

          {/* Create New Question */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Create a New Question</h2>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Enter your question"
              className="w-full p-2 border rounded-md mb-4"
            />

            {/* Options */}
            {newOptions.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="flex-1 p-2 border rounded-md"
                />
                {newOptions.length > 2 && (
                  <button
                    onClick={() => removeOption(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addOption}
              className="text-blue-500 hover:underline mb-4"
            >
              + Add Option
            </button>

            {/* Multi-Select Toggle */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={isMultiSelect}
                onChange={(e) => setIsMultiSelect(e.target.checked)}
                className="mr-2"
              />
              <label>Allow multiple choices</label>
            </div>

            <button
              onClick={addQuestion}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Question
            </button>
          </div>

          {/* Display Existing Questions */}
          {questions.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Existing Questions</h2>
              {questions.map((q, index) => (
                <div
                  key={q.id}
                  className="p-4 border rounded-md mb-4 shadow-sm bg-gray-50"
                >
                  <h3 className="text-lg font-bold">
                    {index + 1}. {q.question}
                  </h3>
                  <ul className="mt-2">
                    {q.options.map((option, optionIndex) => (
                      <li key={optionIndex} className="flex items-center mb-2">
                        {q.isMultiSelect ? (
                          <input type="checkbox" disabled className="mr-2" />
                        ) : (
                          <input type="radio" disabled className="mr-2" />
                        )}
                        {option}
                      </li>
                    ))}
                  </ul>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => editQuestion(q.id)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteQuestion(q.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MCQManager;
