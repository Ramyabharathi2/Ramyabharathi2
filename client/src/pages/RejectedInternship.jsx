import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../Components/SiderBar";

const RejectedInternship = () => {
  // Sample internship data (replace with dynamic data from API)
  const JobList = [
     ];

  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(JobList); // Add filteredJobs state

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Effect hook to filter jobs whenever search term changes
  useEffect(() => {
    const filteredData = JobList.filter((job) => {
      return (
        job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobRole.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredJobs(filteredData);
  }, [searchTerm]); // Dependency on searchTerm to re-filter when search term changes

  return (
    <div className="flex">
      <div>
        <Sidebar/>
      </div>
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Rejected Internship </h2>

      {/* Filter and Search Bar */}
      <div className="flex justify-between mb-4 space-x-4">
        {/* Search Bar */}
        <div className="flex items-center justify-end space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search here"
          />
          <button className="p-2 bg-blue-500 text-white rounded-md">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Job Table */}
      <div className="overflow-x-auto bg-white">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">SI.No</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Internship Role</th>
              <th className="py-2 px-4 border">Contact Number</th>
              <th className="py-2 px-4 border">Email ID</th>
              <th className="py-2 px-4 border">Resume</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job, index) => (
              <tr key={job.id}>
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{job.name}</td>
                <td className="py-2 px-4 border">{job.jobRole}</td>
                <td className="py-2 px-4 border">{job.contactNumber}</td>
                <td className="py-2 px-4 border">{job.email}</td>
                <td className="py-2 px-4 border">
                  {/* Resume View/Download buttons */}
                  <div className="flex space-x-2">
                    <a href={job.resume} target="_blank" rel="noopener noreferrer">
                      <button className="text-white px-4 py-2 border bg-blue-500 rounded-md hover:bg-blue-400">
                        View
                      </button>
                    </a>
                    <a href={job.resume} download>
                      <button className="text-white px-4 py-2 border bg-red-500 rounded-md hover:bg-red-400">
                        Download
                      </button>
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default RejectedInternship;
