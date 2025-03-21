import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const InternshipCard = ({ internship }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 border-l-4 border-blue-500 hover:scale-105 transition-transform duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-bold text-blue-600 mb-2">{internship.companyName}</h2>
      <p className="text-gray-600 text-sm mb-1 flex items-center"><FaBriefcase className="mr-2 text-blue-500" />{internship.InternshipType} - {internship.InternshipRoles.join(', ')}</p>
      <p className="text-gray-600 text-sm mb-1 flex items-center"><FaCalendarAlt className="mr-2 text-blue-500" /> {internship.applicationStartDate} - {internship.applicationEndDate}</p>
      <p className="text-gray-600 text-sm mb-1 flex items-center"><FaMapMarkerAlt className="mr-2 text-blue-500" /> {internship.city}, {internship.state}</p>
      <p className="text-gray-700 mt-2">{internship.InternshipDescription}</p>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-green-500 font-semibold">Stipend: ₹{internship.Stipend}</span>
        <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-md shadow-md hover:from-blue-600 hover:to-blue-800 transition-all" onClick={() => navigate(`/Interapply/${internship._id}`)}>Apply Now</button>
      </div>
    </div>
  );
};

const InternshipList = () => {
  const [internships, setInternships] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/intern");
        setInternships(response.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  const filteredInternships = internships.filter(internship => 
    (internship.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.InternshipRoles.some(role => role.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (filterType === '' || internship.InternshipType === filterType)
  );

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by company or role"
          className="p-3 border rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-3 border rounded-lg w-full md:w-1/4 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm bg-white"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInternships.map((internship, index) => (
          <InternshipCard key={index} internship={internship} />
        ))}
      </div>
    </div>
  );
};

export default InternshipList;
