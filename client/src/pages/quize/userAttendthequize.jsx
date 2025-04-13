import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PlayQuiz() {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  const userId = JSON.parse(localStorage.getItem("userData")).email; // Replace with actual user ID


  // Fetch categories on component load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/addquiz');
        const allCategories = res.data.question.map((q) => q.category);
        const uniqueCategories = [...new Set(allCategories)];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const fetchQuestions = async () => {
    if (!category) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/addquiz/category/${category}`);
      setQuestions(res.data);
      setAnswers(Array(res.data.length).fill(null));
      setCurrent(0);
      setSubmitted(false);
      setResult(null);
    } catch (err) {
      console.error('Error loading questions:', err);
    }
  };

  const handleSelect = (optionIndex) => {
    const updated = [...answers];
    updated[current] = {
      questionId: questions[current]._id,
      selectedOption: optionIndex
    };
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/addquiz/submit', {
        userId,
        quizCategory: category,
        answers
      });
      setResult(res.data);
      setSubmitted(true);
    } catch (err) {
      console.error('Submit failed:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-xl">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">🎯 Play Quiz</h2>

      {!questions.length ? (
        <div className="mb-4 space-y-4">
          <select
            className="w-full p-2 border rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">🎯 Select Quiz Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={fetchQuestions}
            disabled={!category}
          >
            🚀 Start Quiz
          </button>
        </div>
      ) : submitted ? (
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-600">✅ Quiz Submitted!</h3>
          <p className="text-lg mt-2">🎯 Score: <strong>{result.score}</strong></p>
          <p>Total Questions: {result.totalQuestions}</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Q{current + 1}. {questions[current].questionText}
            </h4>
            <ul className="space-y-2">
              {questions[current].options.map((opt, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`cursor-pointer px-4 py-2 rounded-lg border transition ${
                    answers[current]?.selectedOption === idx
                      ? 'bg-blue-100 border-blue-500'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}
              disabled={current === 0}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              ⬅️ Prev
            </button>
            {current < questions.length - 1 ? (
              <button
                onClick={() => setCurrent((prev) => Math.min(prev + 1, questions.length - 1))}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Next ➡️
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit Quiz ✅
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
