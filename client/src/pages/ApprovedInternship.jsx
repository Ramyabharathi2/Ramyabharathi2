import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../Components/SiderBar";

const ApprovedInternships = () => {
  // Sample internship data (replace with dynamic data from API)
  const internshipList = [
   
  ];

  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [testDate, setTestDate] = useState("");
  const [filteredInternships, setFilteredInternships] = useState(internshipList);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    filterInternships(term, statusFilter);
  };

  // Handle status filter change
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    filterInternships(searchTerm, status);
  };

  // Filter internships based on status and search term
  const filterInternships = (searchTerm, statusFilter) => {
    let filteredData = internshipList.filter((internship) => {
      return (
        (internship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          internship.internshipRole.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter ? internship.status === statusFilter : true)
      );
    });
    setFilteredInternships(filteredData);
  };

  // Handle test schedule for all
  const handleTestScheduleForAll = () => {
    if (testDate) {
      setFilteredInternships((prev) =>
        prev.map((intern) => ({
          ...intern,
          testSchedule: testDate,
          testStatus: "Scheduled",
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
      <h2 className="text-3xl font-bold text-center mb-4">Approved Internship Applications</h2>

      {/* Filter and Search Bar */}
      <div className="flex justify-between mb-4 space-x-4">
        {/* Status Filter Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleStatusFilter("QUALIFIED")}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            QUALIFIED
          </button>
          <button
            onClick={() => handleStatusFilter("NOT QUALIFIED")}
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

      {/* Internship Table */}
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
              <th className="py-2 px-4 border">Test Schedule</th>
              <th className="py-2 px-4 border">Test Status</th>
              <th className="py-2 px-4 border">Test Percentage</th>
            </tr>
          </thead>
          <tbody>
            {filteredInternships.map((intern, index) => (
              <tr key={intern.id}>
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{intern.name}</td>
                <td className="py-2 px-4 border">{intern.internshipRole}</td>
                <td className="py-2 px-4 border">{intern.contactNumber}</td>
                <td className="py-2 px-4 border">{intern.email}</td>
                <td className="py-2 px-4 border">
                  <div className="flex space-x-2">
                    <a href={intern.resume} target="_blank" rel="noopener noreferrer">
                      <button className="text-white px-4 py-2 border bg-blue-500 rounded-md hover:bg-blue-400">
                        View
                      </button>
                    </a>
                    <a href={intern.resume} download>
                      <button className="text-white px-4 py-2 border bg-red-500 rounded-md hover:bg-red-400">
                        Download
                      </button>
                    </a>
                  </div>
                </td>
                <td className="py-2 px-4 border">{intern.testSchedule}</td>
                <td className="py-2 px-4 border">{intern.testStatus}</td>
                <td className="py-2 px-4 border">{intern.testPercentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default ApprovedInternships;
