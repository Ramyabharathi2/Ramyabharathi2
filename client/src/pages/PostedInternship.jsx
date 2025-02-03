import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa"; // For the search icon
import Sidebar from "../Components/SiderBar";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


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
const navigate= useNavigate()

  const handleEdit = (id) => {

    navigate("/editIntern/"+id)

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
  console.log(filteredInternships);
  

  return (

     <div className="flex">
      <div className="w-72 bg-blue-900 text-white">
        <Sidebar/>
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

      {/* Internship Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">S.No</th>
              <th className="px-4 py-2 border">Company Name</th>
              <th className="px-4 py-2 border">Internship Type</th>
              <th className="px-4 py-2 border">Internship Role</th>
              <th className="px-4 py-2 border">Application End Date</th>
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
                  {internship.applicationEndDate.split("T")[0] }
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
