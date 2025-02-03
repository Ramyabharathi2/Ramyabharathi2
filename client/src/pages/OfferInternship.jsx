import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import * as XLSX from "xlsx";
import Sidebar from "../Components/SiderBar";

const OfferInternships = () => {
  // Sample internship data (replace with dynamic data from API)
  const internshipList = [
    
  ];

  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
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
      const matchesSearch =
        internship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.internshipRole.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || internship.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
    setFilteredInternships(filteredData);
  };

  // Handle Excel Export
  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredInternships);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Internships");
    XLSX.writeFile(wb, "internships.xlsx");
  };

  return (
    <div className="flex">
      <div>
  <Sidebar/>
      
    </div>
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Offered Internships</h2>

      {/* Filter and Search Bar on the same row */}
      <div className="flex justify-between items-center mb-4 space-x-4">
        {/* Filter Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => handleStatusFilter("All")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            All
          </button>
          <button
            onClick={() => handleStatusFilter("Offered Issued")}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Offered Issued
          </button>
          <button
            onClick={() => handleStatusFilter("Offer Not Issued")}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Offer Not Issued
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by Name or Role"
          />
          <button className="p-2 bg-blue-500 text-white rounded-md">
            <FaSearch />
          </button>
        </div>

        {/* Export to Excel Button */}
        <div className="flex">
          <button
            onClick={handleExportToExcel}
            className="px-6 py-2 bg-yellow-500 text-white rounded-md"
          >
            Export to Excel
          </button>
        </div>
      </div>

      {/* Internship Table */}
      <div className="overflow-x-auto bg-white">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">SI.No</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Internship Role</th>
              <th className="py-2 px-4 border">Test Date</th>
              <th className="py-2 px-4 border">Interview Date</th>
              <th className="py-2 px-4 border">Resume</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Offer Letter Date</th>
              <th className="py-2 px-4 border">Joining Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredInternships.map((intern, index) => (
              <tr key={intern.id}>
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{intern.name}</td>
                <td className="py-2 px-4 border">{intern.internshipRole}</td>
                <td className="py-2 px-4 border">{intern.testDate}</td>
                <td className="py-2 px-4 border">{intern.interviewDate}</td>
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
                <td className="py-2 px-4 border">{intern.status}</td>
                <td className="py-2 px-4 border">{intern.offerLetterDate}</td>
                <td className="py-2 px-4 border">{intern.joiningDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default OfferInternships;
