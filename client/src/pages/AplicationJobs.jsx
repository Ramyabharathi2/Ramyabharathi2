import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // For the search icon
import { nanoid } from "nanoid"; // For generating unique IDs
import Sidebar from "../Components/SiderBar";

const ApplicationsJob = () => {
  // Sample data for internship applications
  const [applications, setApplications] = useState([
    
  ]);

  // States for handling search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Handle category selection (sort by)
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter applications based on selected category and search term
  const filteredApplications = applications.filter((application) => {
    const matchesCategory =
      selectedCategory === "" || application.role.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Approve all applications
  const approveAll = () => {
    setApplications((prevApplications) =>
      prevApplications.map((application) => ({ ...application, status: "Approved" }))
    );
  };

  // Reject all applications
  const rejectAll = () => {
    setApplications((prevApplications) =>
      prevApplications.map((application) => ({ ...application, status: "Rejected" }))
    );
  };

  // Approve or Reject an individual application
  const handleAction = (id, action) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.id === id ? { ...application, status: action } : application
      )
    );
  };

  // Download resume functionality
  const handleDownloadResume = (resume) => {
    const link = document.createElement("a");
    link.href = `path/to/resumes/${resume}`; // Use correct template literal syntax
    link.download = resume;
    link.click();
  };

  // View resume functionality
  const handleViewResume = (resume) => {
    alert(`Viewing resume: ${resume}`);
  };

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="container mx-auto p-4">
        {/* Filter Section */}
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-center mb-4">Received Job Applications</h2>

          {/* Filter Section with Flexbox Layout */}
          <div className="flex justify-between mb-4 space-x-4">
            {/* Sort By Dropdown */}
            <div className="flex items-center space-x-2">
              <label htmlFor="category" className="text-sm font-medium">Sort By:</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Human Resource">Human Resource</option>
                <option value="Testing Module">Testing Module</option>
              </select>
            </div>

            {/* Search Bar */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search here"
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="p-2 bg-blue-500 text-white rounded-md">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Buttons: Approve All and Reject All */}
          <div className="flex justify-start space-x-4 mb-4">
            <button
              onClick={approveAll}
              className="p-2 bg-green-500 text-white rounded-md"
            >
              Approve All
            </button>
            <button
              onClick={rejectAll}
              className="p-2 bg-red-500 text-white rounded-md"
            >
              Reject All
            </button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Sl.No</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Job Role</th>
                <th className="px-4 py-2 border">Contact Number</th>
                <th className="px-4 py-2 border">Email Id</th>
                <th className="px-4 py-2 border">Applied At</th>
                <th className="px-4 py-2 border">Resume</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application, index) => (
                <tr key={application.id} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{application.name}</td>
                  <td className="px-4 py-2 border">{application.role}</td>
                  <td className="px-4 py-2 border">{application.contact}</td>
                  <td className="px-4 py-2 border">{application.email}</td>
                  <td className="px-4 py-2 border">{application.appliedAt}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDownloadResume(application.resume)}
                      className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleViewResume(application.resume)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-md"
                    >
                      View
                    </button>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleAction(application.id, "Approved")}
                      className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(application.id, "Rejected")}
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Reject
                    </button>
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

export default ApplicationsJob;
