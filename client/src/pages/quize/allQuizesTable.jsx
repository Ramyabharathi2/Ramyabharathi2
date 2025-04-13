import { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Sidebar from '../../Components/Siderbar';

export default function ViewQuestionsAdmin() {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/addquiz/${id}`);
      setQuestions(prev => prev.filter(q => q._id !== id));
    } catch (err) {
      console.error('Error deleting question:', err);
    }
  };

  const filtered = questions.filter(q =>
    q.questionText.toLowerCase().includes(search.toLowerCase()) &&
    (filterCategory === '' || q.category === filterCategory)
  );

  const exportToExcel = () => {
    const data = filtered.map(q => ({
      Question: q.questionText,
      Options: q.options.join(' | '),
      CorrectAnswer: q.options[q.correctAnswerIndex],
      Category: q.category,
      Marks: q.marks,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Questions');
    XLSX.writeFile(workbook, 'quiz_questions.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageHeight = doc.internal.pageSize.height;
    let y = 10;
  
    filtered.forEach((q, index) => {
      if (y > pageHeight - 60) {
        doc.addPage();
        y = 10;
      }
  
      doc.setFillColor(240, 248, 255); // light blue background
      doc.roundedRect(10, y, 190, 55, 4, 4, 'F');
  
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 139); // dark blue
      doc.text(`Q${index + 1}: ${q.questionText}`, 14, y + 7);
  
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
  
      // Options
      q.options.forEach((opt, i) => {
        const isCorrect = q.correctAnswerIndex === i;
        const optText = `${String.fromCharCode(65 + i)}. ${opt}`;
        const optY = y + 15 + i * 6;
        if (isCorrect) {
          doc.setTextColor(0, 128, 0);
          doc.setFont(undefined, 'bold');
        } else {
          doc.setTextColor(0, 0, 0);
          doc.setFont(undefined, 'normal');
        }
        doc.text(optText, 18, optY);
      });
  
      // Category & Marks
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.setFont(undefined, 'normal');
      doc.text(` Category: ${q.category}`, 14, y + 42);
      doc.text(` Marks: ${q.marks}`, 160, y + 42, { align: 'right' });
  
      y += 65;
    });
  
    doc.save('quiz_questions_detailed.pdf');
  };
  

  return (
   <div className='flex'>
    <Sidebar/>
     <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">All Quiz Questions</h2>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
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

      <div className="flex justify-end gap-3 mb-4">
        <button onClick={exportToPDF} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Export PDF</button>
        <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">Export Excel</button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No matching questions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table id="table-to-export" className="w-full table-auto border-collapse border border-gray-300 shadow-sm">
            <thead className="bg-blue-100 text-blue-900">
              <tr>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Question</th>
                <th className="border border-gray-300 px-4 py-2">Options</th>
                <th className="border border-gray-300 px-4 py-2">Correct Answer</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Marks</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((q, i) => (
                <tr key={q._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 text-center">{i + 1}</td>
                  <td className="border px-4 py-2">{q.questionText}</td>
                  <td className="border px-4 py-2">
                    <ul className="list-disc list-inside">
                      {q.options.map((opt, idx) => (
                        <li key={idx} className={q.correctAnswerIndex === idx ? 'text-green-600 font-semibold' : ''}>
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border px-4 py-2 text-green-700 font-bold">{q.options[q.correctAnswerIndex]}</td>
                  <td className="border px-4 py-2">{q.category}</td>
                  <td className="border px-4 py-2 text-center">{q.marks}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(q._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
   </div>
  );
}
