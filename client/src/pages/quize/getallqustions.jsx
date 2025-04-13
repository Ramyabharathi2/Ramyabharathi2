import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewQuestions() {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/addquiz')
      .then(res => {
        setQuestions(res.data.question);
        const uniqueCats = [...new Set(res.data.question.map(q => q.category))];
        setCategories(uniqueCats);
      })
      .catch(err => {
        console.error('Error fetching questions:', err);
      });
  }, []);

  const filtered = questions.filter(q =>
    (q.questionText.toLowerCase().includes(search.toLowerCase())) &&
    (filterCategory === '' || q.category === filterCategory)
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">All Quiz Questions</h2>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search question..."
          className="flex-1 border p-2 rounded-lg shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="flex-1 sm:max-w-xs border p-2 rounded-lg shadow-sm"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No matching questions found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((q, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-4 border hover:shadow-xl transition-transform transform hover:scale-[1.02]"
            >
              <h4 className="font-bold text-lg text-blue-700 mb-2">Q: {q.questionText}</h4>
              <ul className="list-disc list-inside mb-2">
                {q.options.map((opt, idx) => (
                  <li key={idx} className={`ml-2 ${q.correctAnswerIndex === idx ? 'text-green-600 font-semibold' : ''}`}>
                    {opt}
                  </li>
                ))}
              </ul>
              <div className="text-sm text-gray-600 flex justify-between mt-3">
                <span>🧠 Category: <b>{q.category}</b></span>
                <span>🏅 Marks: {q.marks}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
