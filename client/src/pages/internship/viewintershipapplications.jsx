import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ApplicationCard = ({ application }) => {

    const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 border-l-4 border-blue-500 hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-bold text-blue-600 mb-2">{application.applicantName}</h2>
      <p className="text-gray-600 text-sm mb-1"><FaEnvelope className="inline mr-2" /> {application.email}</p>
      <p className="text-gray-600 text-sm mb-1"><FaPhone className="inline mr-2" /> {application.phone}</p>
      <p className="text-gray-700 mt-2">Status: {application.status}</p>
      
      <div className="flex justify-between items-center mt-4">
        <a href={"http://localhost:5000"+application.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-green-500 font-semibold hover:underline">View Resume</a>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600" onClick={()=>navigate(`/ApplicationDetails/${application.internshipId}`)}>View Details</button>
      </div>
    </div>
  );
};

const IntershipuserApplicationList = () => {

    const user =JSON.parse( localStorage.getItem("userData"))
  
    console.log(user);

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/intern/user/"+user.email);
        console.log("Application details retrieved successfully:", response.data);
        setApplications(response.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchdata();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {applications.map((application, index) => (
        <ApplicationCard key={index} application={application} />
      ))}
    </div>
  );
};

export default IntershipuserApplicationList;
