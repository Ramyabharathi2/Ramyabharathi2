import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"; // For the search icon
import Sidebar from "../Components/SiderBar";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const PostedInternship = () => {
  // State for the internships data
  const [internships, setInternships] = useState([]);
  
  const getInternshipDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/intern");
      console.log("Intern details retrieved successfully:", response.data);
      setInternships(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("General error:", error.message);
      }
    }
  };

  useEffect(() => {
    getInternshipDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/intern/${id}`);
      setInternships((prevInternships) => prevInternships.filter((intern) => intern._id !== id));
      alert("intern deleted successfully");
      getInternshipDetails();
    } catch (error) {
      console.error("Error deleting intern:", error.message);
    }
  };

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate("/editIntern/" + id);
  };

  // State for the selected category filter and search term
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Handle the category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle the search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle the status toggle (Active/Inactive)
  const handleStatusToggle = (id) => {
    setInternships((prevInternships) =>
      prevInternships.map((internship) =>
        internship.id === id
          ? {
              ...internship,
              status: internship.status === "Active" ? "Inactive" : "Active",
            }
          : internship
      )
    );
  };

  // Filter internships based on selected category and search term
  const filteredInternships = internships.filter((internship) => {
    const matchesCategory =
      selectedCategory === "" ||
      internship.role.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      internship.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.role.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Internships", 14, 16);
  
    const startX = 14;
    const startY = 20;
    const rowHeight = 10;
    let currentY = startY;
  
    filteredInternships.forEach((internship, index) => {
      if (currentY > 280) { // Check if the current Y position is near the bottom of the page
        doc.addPage();
        currentY = startY;
      }
  
      doc.setFontSize(12);
      doc.text(`S.No: ${index + 1}`, startX, currentY);
      doc.text(`Company Name: ${internship.companyName}`, startX, currentY + rowHeight);
      doc.text(`Internship Type: ${internship.InternshipType}`, startX, currentY + 2 * rowHeight);
      doc.text(`Internship Role: ${internship.InternshipRoles[0]}`, startX, currentY + 3 * rowHeight);
      doc.text(`Application Start Date: ${internship.applicationStartDate.split("T")[0]}`, startX, currentY + 4 * rowHeight);
      doc.text(`Application End Date: ${internship.applicationEndDate.split("T")[0]}`, startX, currentY + 5 * rowHeight);
      doc.text(`Status: ${internship.status}`, startX, currentY + 6 * rowHeight);
      doc.text(`Created At: ${internship.createdAt.split("T")[0]} ${internship.createdAt.split("T")[1]}`, startX, currentY + 7 * rowHeight);
  
      currentY += 8 * rowHeight; // Move to the next card position
    });
  
    doc.save('internships.pdf');
  };
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(internships);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Internships');
    XLSX.writeFile(workbook, 'internships.xlsx');
  };

  const handleExportIndividualPDF = (internship) => {
    const doc = new jsPDF();
    doc.text(`Company Name: ${internship.companyName}`, 10, 10);
    doc.text(`Internship Type: ${internship.InternshipType}`, 10, 20);
    doc.text(`Internship Role: ${internship.InternshipRoles[0]}`, 10, 30);
    doc.text(`Application Start Date: ${internship.applicationStartDate.split("T")[0]}`, 10, 40);
    doc.text(`Application End Date: ${internship.applicationEndDate.split("T")[0]}`, 10, 50);
    doc.text(`Status: ${internship.status}`, 10, 60);
    doc.text(`Created At: ${internship.createdAt.split("T")[0]} ${internship.createdAt.split("T")[1]}`, 10, 70);
    doc.save(`${internship.companyName}.pdf`);
  };

  return (
    <div className="flex">
      <div className="w-72 bg-blue-900 text-white">
        <Sidebar />
      </div>
      <div className="container mx-auto p-4">
        {/* Filter Section */}
        <div className="mb-4">
          {/* Centered Heading */}
          <h2 className="text-3xl font-bold text-center mb-4">
            Posted Internship
          </h2>

          {/* Filter Section with Flexbox Layout */}
          <div className="flex justify-between mb-4 space-x-4">
            {/* Sort By Dropdown - Aligned Left */}
            <div className="flex items-center space-x-2">
              <label htmlFor="category" className="text-sm font-medium">
                Sort By:
              </label>
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
                <option value="Test">Test</option>
              </select>
            </div>

            {/* Search Bar - Aligned Right */}
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
        </div>

        {/* Export Buttons */}
        <div className="mb-4 flex space-x-4">
          <button onClick={handleExportPDF} className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Export All to PDF
          </button>
          <button onClick={handleExportExcel} className="px-4 py-2 bg-green-500 text-white rounded-md">
            Export All to Excel
          </button>
        </div>

        {/* Internship Table */}
        <div className="overflow-x-auto">
          <table id="internship-table" className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">S.No</th>
                <th className="px-4 py-2 border">Company Name</th>
                <th className="px-4 py-2 border">Internship Type</th>
                <th className="px-4 py-2 border">Internship Role</th>
                <th className="px-4 py-2 border">Application Start Date</th>
                <th className="px-4 py-2 border">Application End Date</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Created At</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInternships?.map((internship, index) => (
                <tr key={internship.id} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{internship.companyName}</td>
                  <td className="px-4 py-2 border">
                    {internship.InternshipType}
                  </td>
                  <td className="px-4 py-2 border">{internship.InternshipRoles[0]}</td>
                  <td className="px-4 py-2 border">{internship.applicationStartDate.split("T")[0]}</td>
                  <td className="px-4 py-2 border">
                    {internship.applicationEndDate.split("T")[0]}
                  </td>
                  <td className="px-4 py-2 border">
                    {/* Show the "Active" status with a button */}
                    <button
                      onClick={() => handleStatusToggle(internship.id)}
                      className={`px-4 py-2 rounded-md text-white ${
                        internship.status === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {internship.status}
                    </button>
                  </td>
                  <td className="px-4 py-2 border">{internship.createdAt.split("T")[0]}<br/>{internship.createdAt.split("T")[1]}</td>
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(internship._id)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(internship._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleExportIndividualPDF(internship)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                      >
                        Export PDF
                      </button>
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

export default PostedInternship;