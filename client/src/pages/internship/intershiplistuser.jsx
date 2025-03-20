import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const InternshipCard = ({ internship }) => {

    const navigate=useNavigate()

  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 border-l-4 border-blue-500 hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-bold text-blue-600 mb-2">{internship.companyName}</h2>
      <p className="text-gray-600 text-sm mb-1"><FaBriefcase className="inline mr-2" />{internship.InternshipType} - {internship.InternshipRoles.join(', ')}</p>
      <p className="text-gray-600 text-sm mb-1"><FaCalendarAlt className="inline mr-2" /> {internship.applicationStartDate} - {internship.applicationEndDate}</p>
      <p className="text-gray-600 text-sm mb-1"><FaMapMarkerAlt className="inline mr-2" /> {internship.city}, {internship.state}</p>
      <p className="text-gray-700 mt-2">{internship.InternshipDescription}</p>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-green-500 font-semibold">Stipend: ₹{internship.Stipend}</span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600" onClick={()=>navigate(`/Interapply/${internship._id}`)} >Apply Now</button>
      </div>
    </div>
  );
};

const InternshipList = () => {

  const [internships,setinternships]=useState([])

  useEffect(()=>{


    const fetchdata=async () => {

        try {
            const response = await axios.get("http://localhost:5000/api/intern");
            console.log("Intern details retrieved successfully:", response.data);
            setinternships(response.data)
        } catch (error) {
            alert(error)
        }

       
    }
    fetchdata()


  })


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {internships.map((internship, index) => (
        <InternshipCard key={index} internship={internship} />
      ))}
    </div>
  );
};

export default InternshipList;

