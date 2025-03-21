import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-lg rounded-2xl p-3 border-l-4 border-blue-500 hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-bold text-blue-600 mb-2">{job.companyName}</h2>
      <p className="text-gray-600 text-sm mb-1"><FaBriefcase className="inline mr-2" />{job.jobType} - {job.jobRoles.join(', ')}</p>
      <p className="text-gray-600 text-sm mb-1"><FaCalendarAlt className="inline mr-2" /> {job.applicationStartDate} - {job.applicationEndDate}</p>
      <p className="text-gray-600 text-sm mb-1"><FaMapMarkerAlt className="inline mr-2" /> {job.district}, {job.country}</p>
      <p className="text-gray-700 mt-2">{job.jobDescription}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-green-500 font-semibold">Salary: ₹{job.salaryPackage}</span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600" onClick={() => navigate(`/JobApply/${job._id}`)}>Apply Now</button>
      </div>
    </div>
  );
};

const UserjobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/job");
        console.log("Job details retrieved successfully:", response.data);
        setJobs(response.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchdata();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    return (
      (job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobRoles.some(role => role.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (filterType === "All" || job.jobType === filterType)
    );
  });

  return (
    <div className="p-10">
      <div className="mb-4 flex gap-4">
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by company or role..."
            className="p-2 pl-10 w-[300px] shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 rounded-md border-none outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="p-2 border rounded-md"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => <JobCard key={index} job={job} />)
        ) : (
          <p className="text-gray-600">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default UserjobList;
