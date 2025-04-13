import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

const QuizAttemptsTable = ({ data }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [filtered, setFiltered] = useState(data);

  useEffect(() => {
    let filteredData = data;

    if (search) {
      filteredData = filteredData.filter(item =>
        item.userId.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filteredData = filteredData.filter(item =>
        item.quizCategory === category
      );
    }

    setFiltered(filteredData);
  }, [search, category, data]);

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attempts');
    XLSX.writeFile(workbook, 'quiz_attempts.xlsx');
  };

  const exportPdf = () => {
    const doc = new jsPDF();
    let y = 10;

    filtered.forEach((attempt, index) => {
      doc.setFillColor(240, 240, 240);
      doc.rect(10, y, 190, 50, 'F');
      doc.setFontSize(12);
      doc.text(`User: ${attempt.userId}`, 15, y + 10);
      doc.text(`Category: ${attempt.quizCategory}`, 15, y + 20);
      doc.text(`Score: ${attempt.score} / ${attempt.totalQuestions}`, 15, y + 30);
      doc.text(`Date: ${new Date(attempt.date).toLocaleString()}`, 15, y + 40);

      y += 60;
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save('quiz_attempts.pdf');
  };

  const categories = [...new Set(data.map(d => d.quizCategory))];

  return (
    <div className="p-10 space-y-6" style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}} >
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <input
          type="text"
          placeholder="Search by Email"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={exportPdf}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Export PDF
          </button>
          <button
            onClick={exportExcel}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Export Excel
          </button>
        </div>
      </div>

      <div className="overflow-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-left text-gray-700 uppercase font-semibold tracking-wide">
            <tr>
              <th className="px-4 py-3">User Email</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Total Questions</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center px-4 py-6 text-gray-500">
                  No data found.
                </td>
              </tr>
            ) : (
              filtered.map((attempt, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{attempt.userId}</td>
                  <td className="px-4 py-3">{attempt.quizCategory}</td>
                  <td className="px-4 py-3">{attempt.score}</td>
                  <td className="px-4 py-3">{attempt.totalQuestions}</td>
                  <td className="px-4 py-3">{new Date(attempt.date).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizAttemptsTable;
