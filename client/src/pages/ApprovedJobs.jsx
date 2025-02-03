import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../Components/SiderBar";

const ApprovedJobs = () => {
  // Sample internship data (replace with dynamic data from API)
  const JobList = [
    
  ];

  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [testDate, setTestDate] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(JobList);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    filterJobs(term, statusFilter);
  };

  // Handle status filter change
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterJobs(searchTerm, status);
  };

  // Filter jobs based on search term and status filter
  const filterJobs = (searchTerm, statusFilter) => {
    let filteredData = JobList.filter((job) => {
      return (
        (job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.jobRole.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter ? job.allottestmodule === statusFilter : true)
      );
    });
    setFilteredJobs(filteredData);
  };

  // Handle test schedule for all
  const handleTestScheduleForAll = () => {
    if (testDate) {
      setFilteredJobs((prev) =>
        prev.map((job) => ({
          ...job,
          SelectTest: testDate,
          allottestmodule: "Scheduled", // Assuming this field is related to the test module status
        }))
      );
    } else {
      alert("Please select a date for the test schedule.");
    }
  };

  return (
    <div className="flex">
      <div>
        <Sidebar/>
      </div>
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Approved Job Applications</h2>

      {/* Filter and Search Bar */}
      <div className="flex justify-between mb-4 space-x-4">
        {/* Status Filter Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleStatusFilter("Pending")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            QUALIFIED
          </button>
          <button
            onClick={() => handleStatusFilter("Scheduled")}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
           NOT QUALIFIED
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-2">
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

      {/* Test Schedule for All */}
      <div className="mb-4 flex justify-start items-center space-x-4">
        <h6>Test Schedule for All</h6>
        {/* Date Picker for scheduling the test */}
        <input
          type="date"
          value={testDate}
          onChange={(e) => setTestDate(e.target.value)}
          className="px-4 py-2 border rounded-md"
        />
        <button
          onClick={handleTestScheduleForAll}
          className="p-2 bg-gray-400 text-white rounded-md"
        >
          Submit
        </button>
      </div>

      {/* Job Table */}
      <div className="overflow-x-auto bg-white">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">SI.No</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Job Role</th>
              <th className="py-2 px-4 border">Contact Number</th>
              <th className="py-2 px-4 border">Email ID</th>
              <th className="py-2 px-4 border">Resume</th>
              <th className="py-2 px-4 border">Test Date</th>
              <th className="py-2 px-4 border">Test Module Status</th>
              <th className="py-2 px-4 border">Test Tin</th>
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
                  {/* View and Download Buttons */}
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
                <td className="py-2 px-4 border">{job.SelectTest}</td>
                <td className="py-2 px-4 border">{job.allottestmodule}</td>
                <td className="py-2 px-4 border">{job.testtin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default ApprovedJobs;
