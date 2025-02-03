import React, { useState, useEffect } from "react";
import Sidebar from "../Components/SiderBar";

const EditDeleteQuestion = ({ deleteQuestion, editQuestion }) => {
  const [roleInput, setRoleInput] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [questions,setQuestions]=useState(
    
    [
      {
        question: 'What is the output of 1 + "1" in JavaScript?',
        options: ['2', '11', 'Error', 'undefined'],
      },
      {
        question: 'Which company developed JavaScript?',
        options: ['Microsoft', 'Sun Microsystems', 'Netscape', 'Google'],
      },
      {
        question: 'Which keyword is used to declare a variable in ES6?',
        options: ['var', 'let', 'const', 'All of the above'],
      },
    ],
  )
  const [roles] = useState([
    "Frontend Developer",
    "Human Resource",
    "Testing Module",
    "Test",
  ]);

  const handleRoleChange = (e) => setRoleInput(e.target.value);

  const handleRoleSelect = (role) => {
    setRoleInput(role);
    setIsDropdownVisible(false);
  };

  const handleBackButton = () => {
    window.history.back();
  };

  const handleInputClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest("#role-input") && !e.target.closest("#role-dropdown")) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-blue-900 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow min-h-screen p-6">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-blue-700">
              Manage Test Details
            </h2>
            <button
              onClick={handleBackButton}
              className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-200"
            >
              Back
            </button>
          </div>

          {/* Role Input with Dropdown */}
          <div className="mb-8 relative">
            <label
              htmlFor="role-input"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Select Role:
            </label>
            <div className="relative">
              <input
                id="role-input"
                type="text"
                value={roleInput}
                onChange={handleRoleChange}
                onClick={handleInputClick}
                placeholder="Enter or select a role"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span className="absolute inset-y-0 right-4 flex items-center text-gray-400 pointer-events-none">
                ▼
              </span>
            </div>
            {/* Dropdown */}
            {isDropdownVisible && (
              <div
                id="role-dropdown"
                className="absolute z-10 w-full bg-white border border-gray-200 mt-2 rounded-lg shadow-lg"
              >
                {roles.map((role, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleRoleSelect(role)}
                  >
                    {role}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Questions Table */}
          <div className="overflow-x-auto shadow rounded-lg border border-gray-300">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">
                    SNO
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">
                    Question
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">
                    Option 1
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">
                    Option 2
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">
                    Option 3
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">
                    Option 4
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">
                    Correct Option
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {questions?.map((question, index) => (
                  <tr key={index} className="bg-white">
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {question.question}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {question.options[0]}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {question.options[1]}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {question.options[2]}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {question.options[3]}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {question?.correct}
                    </td>
                    <td className="px-4 py-3 text-sm flex gap-2">
                      <button
                        onClick={() => editQuestion(index)}
                        className="px-3 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteQuestion(index)}
                        className="px-3 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDeleteQuestion;
