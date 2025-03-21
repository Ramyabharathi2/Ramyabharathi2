import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const JobDetailsPage = () => {
    const { id } = useParams();
    const [internship, setInternship] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInternship = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/job/${id}`);
                console.log(response.data);
                
                setInternship(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch internship details. Please try again.');
                setLoading(false);
            }
        };
        fetchInternship();
    }, [id]);

    if (loading) return <p className="text-center text-blue-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
      <>                
      <br />
      <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl mx-auto bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-2xl rounded-3xl p-8 border-l-8 border-yellow-200"
        >
            <h1 className="text-4xl font-extrabold mb-4">{internship.companyName}</h1>
            <p className="text-lg mb-2"><FaBriefcase className="inline mr-2" /> {internship.jobType} - {internship.jobRoles.join(', ')}</p>
            <p className="text-lg mb-2"><FaCalendarAlt className="inline mr-2" /> {new Date(internship.applicationStartDate).toLocaleDateString()} - {new Date(internship.applicationEndDate).toLocaleDateString()}</p>
            <p className="text-lg mb-2"><FaMapMarkerAlt className="inline mr-2" /> {internship.district}, {internship.country}</p>
            <p className="text-lg mb-2"><FaMoneyBillWave className="inline mr-2" /> Salary: ₹{internship.salaryPackage}</p>
            <p className="text-lg mt-4"><strong>Description:</strong> {internship.jobDescription}</p>
            <p className="text-lg mt-2"><strong>Skills Required:</strong> {internship.requiredSkills}</p>
            <p className="text-lg mt-2"><strong>Experience Required:</strong> {internship.experienceRequired}</p>
            <p className="text-lg mt-2"><strong>Qualification:</strong> {internship.qualification} ({internship.degreesPreferred})</p>
            <p className="text-lg mt-2"><strong>Contact Email:</strong> {internship.contactEmail}</p>
            <p className="text-lg mt-2"><strong>Contact Number:</strong> {internship.contactNumber}</p>
            <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="bg-blue-100 text-blue-800 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-500 mt-6 w-full"
            >
                Apply Now   
            </motion.button>
        </motion.div>
      </>
    );
};

export default JobDetailsPage;
