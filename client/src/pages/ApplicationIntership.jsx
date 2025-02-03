import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { nanoid } from "nanoid";
import Sidebar from "../Components/SiderBar";

const ReceivedApplications = () => {
  // State for applications
  const [applications, setApplications] = useState([]);

  // States for search, category, and status filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Sample data for testing (replace with API fetch in production)
  useEffect(() => {
    setApplications([
      
    ]);
  }, []);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle status selection
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  // Approve all applications
  const approveAll = () => {
    setApplications((prevApplications) =>
      prevApplications.map((application) => ({
        ...application,
        status: "Approved",
      }))
    );
  };

  // Reject all applications
  const rejectAll = () => {
    setApplications((prevApplications) =>
      prevApplications.map((application) => ({
        ...application,
        status: "Rejected",
      }))
    );
  };

  // Approve or reject individual application
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
    link.href = `/path/to/resumes/${resume}`; // Replace with actual path
    link.download = resume;
    link.click();
  };

  // View resume functionality
  const handleViewResume = (resume) => {
    alert(`Viewing resume: ${resume}`);
  };

  // Filter applications
  const filteredApplications = applications.filter((application) => {
    const matchesCategory =
      selectedCategory === "" ||
      application.role.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesStatus =
      selectedStatus === "" ||
      application.status.toLowerCase().includes(selectedStatus.toLowerCase());
    const matchesSearch =
      application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto p-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-4">
          Received Internship Applications
        </h2>

        {/* Filter Section */}
        <div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          {/* Sort by Role */}
          <div className="flex items-center space-x-2">
            <label htmlFor="category" className="text-sm font-medium">
              Sort By Role:
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Roles</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Human Resource">Human Resource</option>
              <option value="Testing Module">Testing Module</option>
            </select>
          </div>

          {/* Filter by Status */}
          <div className="flex items-center space-x-2">
            <label htmlFor="status" className="text-sm font-medium">
              Filter By Status:
            </label>
            <select
              id="status"
              value={selectedStatus}
              onChange={handleStatusChange}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name or email"
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Approve/Reject All Buttons */}
        <div className="flex space-x-4 mb-4">
          <button
            onClick={approveAll}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Approve All
          </button>
          <button
            onClick={rejectAll}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Reject All
          </button>
        </div>

        {/* Applications Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Sl.No</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Contact</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Applied At</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Resume</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-500">
                    No applications found.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((application, index) => (
                  <tr
                    key={application.id}
                    className="odd:bg-white even:bg-gray-50"
                  >
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{application.name}</td>
                    <td className="px-4 py-2 border">{application.role}</td>
                    <td className="px-4 py-2 border">{application.contact}</td>
                    <td className="px-4 py-2 border">{application.email}</td>
                    <td className="px-4 py-2 border">{application.appliedAt}</td>
                    <td className="px-4 py-2 border">{application.status}</td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() =>
                          handleDownloadResume(application.resume)
                        }
                        className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => handleViewResume(application.resume)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                      >
                        View
                      </button>
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleAction(application.id, "Approved")}
                        className="px-4 py-2 mr-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(application.id, "Rejected")}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReceivedApplications;
