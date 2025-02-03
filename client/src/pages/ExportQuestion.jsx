import React, { useState, useEffect } from "react";
import Sidebar from "../Components/SiderBar";

const ExportQuestion = ({ questions, deleteQuestion, editQuestion }) => {
  const [moduleInput, setModuleInput] = useState(""); // State to store input value
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State to toggle dropdown visibility
  const [modules] = useState([
    "Frontend Developer",
    "Human Resource",
    "Testing Module",
    "Test",
  ]);

  // Handle module input change
  const handleModuleChange = (e) => setModuleInput(e.target.value);

  const handleModuleSelect = (module) => {
    setModuleInput(module);
    setIsDropdownVisible(false);
  };

  const handleBackButton = () => window.history.back();

  const handleInputClick = () => setIsDropdownVisible(!isDropdownVisible);

  const handleOutsideClick = (e) => {
    if (
      !e.target.closest("#module-input") &&
      !e.target.closest("#module-dropdown")
    ) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const exportToCSV = () => {
    const header = [
      "SNO",
      "Question",
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Correct Option",
    ];
    const rows = (questions || []).map((question, index) => [
      index + 1,
      question.question,
      question.option1,
      question.option2,
      question.option3,
      question.option4,
      question.correctOption,
    ]);
    const csvContent = [header.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "export_questions.csv";
    link.click();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-50 to-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-blue-900 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center p-8">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl p-8 relative">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-blue-600">Export Questions</h2>
            <button
              onClick={handleBackButton}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
            >
              Back
            </button>
          </div>

          {/* Module Input */}
          <div className="mb-6">
            <label
              htmlFor="module-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Module:
            </label>
            <div className="relative">
              <input
                id="module-input"
                type="text"
                value={moduleInput}
                onChange={handleModuleChange}
                onClick={handleInputClick}
                placeholder="Select or enter module"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 pointer-events-none">
                ▼
              </span>
              {isDropdownVisible && (
                <div
                  id="module-dropdown"
                  className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                >
                  {modules.map((module, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleModuleSelect(module)}
                    >
                      {module}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Questions Table */}
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "SNO",
                    "Question",
                    "Option 1",
                    "Option 2",
                    "Option 3",
                    "Option 4",
                    "Correct Option",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-2 text-left text-sm font-semibold text-gray-600"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {(questions || []).map((question, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {question.question}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {question.option1}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {question.option2}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {question.option3}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {question.option4}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {question.correctOption}
                    </td>
                    <td className="px-4 py-2 text-sm flex gap-2">
                      <button
                        onClick={() => editQuestion(question.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteQuestion(question.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Export Button */}
          <div className="mt-8 flex justify-start">
            <button
              onClick={exportToCSV}
              className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Export to Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportQuestion;
