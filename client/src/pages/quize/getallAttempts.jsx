import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuizAttemptsTable from './QuizeAttemptTable'; // your table component
import Sidebar from '../../Components/SiderBar';

const QuizAttemptsPage = () => {
  const [quizAttempts, setQuizAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/addquiz/all/attempts');
        setQuizAttempts(res.data);
      } catch (error) {
        console.error('Error fetching attempts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttempts();
  }, []);

  return (
     <div className='flex'>
        <Sidebar/>
    
        <div className="min-h-screen bg-gray-50 p-6" style={{
           
        }}>
      <h1 className="text-2xl font-bold mb-4">All Quiz Attempts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <QuizAttemptsTable data={quizAttempts} />
      )}
    </div>
        </div>
   
  );
};

export default QuizAttemptsPage;
