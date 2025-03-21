import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../Components/SiderBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const navigate = useNavigate();

  const jobTypes = ["Frontend Developer", "Human Resource", "Testing Module", "Test"];

  const getJobDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/job");
      localStorage.setItem("JobListLength", response.data.length);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching job details:", error);
      alert("Failed to fetch job details. Please try again later.");
    }
  };

  useEffect(() => {
    getJobDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/job/${id}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
      alert("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job. Please try again later.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/editJob/${id}`);
  };

  const filteredJobList = jobs.filter((job) => {
    try {
      return (
        (job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.jobRoles.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (jobTypeFilter ? job.jobRoles === jobTypeFilter : true)
      );
    } catch (error) {
      console.error("Error filtering job list:", error);
      return true;
    }
  });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(jobs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Jobs");
    XLSX.writeFile(workbook, "JobDetails.xlsx");
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Job Details", 20, 10);
  
    // Define column headers
    const headers = ["S.No", "Company Name", "Job Role", "Start Date", "End Date", "Status"];
  
    // Define table rows
    const tableData = jobs.map((job, index) => [
      index + 1,
      job.companyName,
      job.jobRoles,
      job.applicationStartDate.split("T")[0],
      job.applicationEndDate.split("T")[0],
      job.status,
    ]);
  
    let yPos = 20; // Initial Y position
    doc.text(headers.join("  |  "), 20, yPos);
    yPos += 10; // Move down for rows
  
    tableData.forEach((row) => {
      doc.text(row.join("  |  "), 20, yPos);
      yPos += 10;
    });
  
    doc.save("JobDetails.pdf");
  };
  

  const exportIndividualToExcel = (job) => {
    const worksheet = XLSX.utils.json_to_sheet([job]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Job");
    XLSX.writeFile(workbook, `${job.companyName}_JobDetails.xlsx`);
  };

  const exportIndividualToPDF = (job) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });
  
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Job Details", 105, 15, { align: "center" });
  
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
  
    // Ensure all values are properly formatted
    const safeText = (text) => (text ? String(text) : "N/A");
  
    // Define job details as an array
    const jobDetails = [
      ["Company Name:", safeText(job.companyName)],
      ["Job Role:", safeText(job.jobRoles)],
      ["Start Date:", safeText(job.applicationStartDate?.split("T")[0])],
      ["End Date:", safeText(job.applicationEndDate?.split("T")[0])],
      ["Status:", safeText(job.status)],
    ];
  
    let y = 30; // Start position for text
    jobDetails.forEach(([label, value]) => {
      doc.text(label, 20, y);
      doc.text(value, 80, y);
      y += 10;
    });
  
    doc.save(`${safeText(job.companyName)}_JobDetails.pdf`);
  };
  

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-center mb-4">Posted Jobs</h2>
        <div className="flex justify-between mb-4 space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search here"
            className="px-4 py-2 border rounded-md"
          />
          <select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">All Job Roles</option>
            {jobTypes.map((type, idx) => (
              <option key={idx} value={type}>{type}</option>
            ))}
          </select>
          <button onClick={exportToExcel} className="bg-green-500 text-white px-4 py-2 rounded-md">Export Excel</button>
          <button onClick={exportToPDF} className="bg-blue-500 text-white px-4 py-2 rounded-md">Export PDF</button>
        </div>
        <table className="min-w-max table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">S.No</th>
              <th className="py-2 px-4 border">Company Name</th>
              <th className="py-2 px-4 border">Job Role</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobList.map((job, index) => (
              <tr key={job._id} className="odd:bg-white even:bg-gray-50">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{job.companyName}</td>
                <td className="py-2 px-4 border">{job.jobRoles}</td>
                <td className="px-4 py-2 border flex space-x-2">
                  <button onClick={() => exportIndividualToExcel(job)} className="bg-green-500 text-white px-4 py-2 rounded-md">Excel</button>
                  <button onClick={() => exportIndividualToPDF(job)} className="bg-blue-500 text-white px-4 py-2 rounded-md">PDF</button>
                  <button onClick={() => handleEdit(job._id)} className="bg-yellow-500 text-white px-4 py-2 rounded-md">Edit</button>
                  <button onClick={() => handleDelete(job._id)} className="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostedJobs;