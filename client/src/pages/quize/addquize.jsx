import { useState } from 'react';
import axios from 'axios';

export default function AddQuestion() {
  const [formData, setFormData] = useState({
    questionText: '',
    options: ['', '', '', ''],
    correctAnswerIndex: 0,
    marks: 1,
    category: '',
  });

  const [questionList, setQuestionList] = useState([]);
  const [message, setMessage] = useState('');

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleAddToList = () => {
    setQuestionList([...questionList, formData]);
    setFormData({
      questionText: '',
      options: ['', '', '', ''],
      correctAnswerIndex: 0,
      marks: 1,
      category: '',
    });
    setMessage('✅ Question added to list!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (questionList.length === 0) {
      setMessage('⚠️ Add at least one question before submitting.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/addquiz/add', questionList); // ensure backend handles array
      setMessage('✅ All questions submitted successfully!');
      setQuestionList([]);
    } catch (error) {
      setMessage('❌ Failed to submit questions');
    }
  };

  const categoryOptions = [
    'General Knowledge',
    'Science',
    'Mathematics',
    'History',
    'Geography',
    'Computer Science',
    'English Grammar',
    'Sports',
    'Current Affairs',
    'Logical Reasoning',
    'Coding',
    'Aptitude',
    'Environment',
    'Space & Universe',
    'Inventions',
    'Biology',
    'Physics',
    'Chemistry',
    'Politics',
    'Economics',
  ];

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Add New Question</h2>
      {message && <div className="mb-4 text-center text-green-600">{message}</div>}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="font-semibold">Question Text</label>
          <textarea
            className="w-full border rounded-md p-2 mt-1"
            rows="2"
            value={formData.questionText}
            onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {formData.options.map((opt, index) => (
            <div key={index}>
              <label className="font-medium">Option {index + 1}</label>
              <input
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full border rounded-md p-2 mt-1"
                required
              />
            </div>
          ))}
        </div>

        <div>
          <label className="font-semibold">Correct Answer (0-3)</label>
          <input
            type="number"
            min="0"
            max="3"
            value={formData.correctAnswerIndex}
            onChange={(e) =>
              setFormData({ ...formData, correctAnswerIndex: parseInt(e.target.value) })
            }
            className="w-full border rounded-md p-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Marks</label>
          <input
            type="number"
            value={formData.marks}
            onChange={(e) =>
              setFormData({ ...formData, marks: parseInt(e.target.value) })
            }
            className="w-full border rounded-md p-2 mt-1"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border rounded-md p-2 mt-1"
            required
          >
            <option value="">Select a category</option>
            {categoryOptions.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleAddToList}
            className="w-1/2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            ➕ Add to List
          </button>
          <button
            type="submit"
            className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            🚀 Submit All
          </button>
        </div>

        {questionList.length > 0 && (
          <div className="text-sm text-gray-600 mt-2 text-center">
            {questionList.length} question(s) added to the list.
          </div>
        )}
      </form>
    </div>
  );
}
