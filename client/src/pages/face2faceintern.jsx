import React, { useState, useEffect } from "react";
import Sidebar from "../Components/SiderBar";

const F2fInternship = () => {
  // Sample data for rejected jobs
  const InternshipList = [
   
  ];

  // State variables
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInternships, setFilteredInternships] = useState(InternshipList);

  // Handle search input changes
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Effect hook to filter jobs whenever searchTerm or JobList changes
  useEffect(() => {
    const filteredData = InternshipList.filter((Internship) => {
      return (
        Internship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Internship.internshiprole.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredInternships(filteredData);
  }, [searchTerm, InternshipList]); // Add JobList to the dependency array

  return (
    <div className="flex">
        <div>
            <Sidebar/>
        </div>
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-4">Face 2 Face Interview for a Internship</h2>

      {/* Search Bar */}
      <div className="flex justify-between mb-4 space-x-4">
        <div className="flex items-center justify-end space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search here"
          />
        </div>
      </div>

      {/* Job Table */}
      <div className="overflow-x-auto bg-white">
        <table className="min-w-full  table-auto border-collapse">
          <thead >
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">SI.No</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">internship Role</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Zoom</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInternships.map((internship, index) => (
              <tr key={internship.id}>
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{internship.name}</td>
                <td className="py-2 px-4 border">{internship.internshiprole}</td>
                <td className="py-2 px-4 border">{internship.date}</td>
                <td className="py-2 px-4 border">{internship.zoom}</td>
                <td className="py-2 px-4 border">
                  {internship.action ? (
                    <a href={internship.action} target="_blank" rel="noopener noreferrer">
                      View Resume
                    </a>
                  ) : (
                    "No resume available"
                  )}
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

export default F2fInternship;