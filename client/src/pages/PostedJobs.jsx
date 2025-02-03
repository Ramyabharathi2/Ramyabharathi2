import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Sidebar from "../Components/SiderBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostedJobs = () => {
  const [jobs, setJobs] = useState([]);

  const getJobDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/job");
      console.log("Job details retrieved successfully:", response.data);
      const length= response.data.length;
      localStorage.setItem('JobListLength', length);
      setJobs(response.data);
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
    getJobDetails();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");

  const jobTypes = ["Frontend Developer", "Human Resource", "Testing Module", "Test"];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/job/${id}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      alert("Job deleted successfully");
      getJobDetails();
    } catch (error) {
      console.error("Error deleting job:", error.message);
    }
  };
const navigate= useNavigate()

  const handleEdit = (id) => {

    navigate("/editJob/"+id)

  };

  const filteredJobList = jobs.filter((job) => {
    return (
      (job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.jobRoles.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (jobTypeFilter ? job.jobRoles === jobTypeFilter : true)
    );
  });

  

  const handleStatusToggle = (id) => {
    setJobs((prevInternships) =>
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
  

  return (
    <div className="flex">
      <div>

      <Sidebar />
      </div>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-center mb-4">Posted Jobs</h2>
          <div className="flex justify-between mb-4 space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="category" className="text-sm font-medium">
                Sort By:
              </label>
              <select
                id="category"
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Job Roles</option>
                {jobTypes.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search here"
              />
              <button className="p-2 bg-blue-500 text-white rounded-md">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-max table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">S.No</th>
                <th className="py-2 px-4 border">Company Name</th>
                <th className="py-2 px-4 border">Job Type</th>
                <th className="py-2 px-4 border">Job Role</th>
                <th className="py-2 px-4 border">Application Start Date</th>
                <th className="py-2 px-4 border">Application End Date</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Created At</th>
               
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobList.map((job, index) => (
                <tr key={job.id} className="odd:bg-white even:bg-gray-50">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{job.companyName}</td>
                  <td className="py-2 px-4 border">{job.jobType}</td>
                  <td className="py-2 px-4 border">{job.jobRoles}</td>
                  <td className="py-2 px-4 border">{job.applicationStartDate.split("T")[0]}</td>
                  <td className="py-2 px-4 border">{job.applicationEndDate.split("T")[0]}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() =>
                        setJobs((prevJobs) =>
                          prevJobs.map((j) =>
                            j.id === job.id
                              ? {
                                  ...j,
                                  status: j.status === "Active" ? "Inactive" : "Active",
                                }
                              : j
                          )
                        )
                      }
                      className={`px-4 py-2 rounded-md text-white ${
                        job.status === "Active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {job.status}
                    </button>
                  </td>
                  <td className="px-4 py-2 border">{job.createdAt.split("T")[0]}</td>
                  
                  <td className="px-4 py-2 border">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(job._id)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
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

export default PostedJobs;
