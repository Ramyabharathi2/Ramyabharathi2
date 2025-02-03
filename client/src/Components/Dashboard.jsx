import React, { useEffect, useState } from "react";

import { Line } from "react-chartjs-2"; // Use Line chart component
import "react-calendar/dist/Calendar.css";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import Sidebar from "./Siderbar";

// Register the necessary components for Line chart
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Dashboard = () => {
  const [JobListLength, setJobLength] = useState();
  const [InternLength, setInternLength] = useState();

  // Only declare storedUser once
  const storedUser = JSON.parse(localStorage.getItem("userData"));

  const getJobDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/job");
      console.log("Job details retrieved successfully:", response.data);
      setJobLength(response.data.length);
    } catch (error) {
      console.error("Error fetching job details:", error.message);
    }
  };

  const getInternshipDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/Intern");
      console.log("Internship details retrieved successfully:", response.data);
      setInternLength(response.data.length);
    } catch (error) {
      console.error("Error fetching internship details:", error.message);
    }
  };

  useEffect(() => {
    getJobDetails();
    getInternshipDetails(); // Combine API calls into one useEffect
  }, []);

  // Data for Line Chart
  const lineChartData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Internship Postings",
        data: [0.1, 0.4, 0.2, 0.5, 0.7, 0.3, 0.8, 0.6, 0.4, 0.9, 0.3, 0.5],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: "Job Postings",
        data: [0.2, 0.6, 0.4, 0.7, 0.9, 0.6, 0.5, 0.8, 0.7, 0.9, 0.6, 0.7],
        borderColor: "rgba(244, 114, 182, 1)",
        backgroundColor: "rgba(244, 114, 182, 0.2)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-indigo-900 to-blue-900 text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="p-8 flex-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Welcome, <span className="text-blue-500">{storedUser?.name}</span>
          </h1>
         
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-6 rounded-lg shadow-md text-center border-b-2 border-blue-500">
            <p className="text-4xl font-bold text-blue-500">0</p>
            <h3 className="text-lg font-semibold text-gray-600">Internship Applications</h3>
          </div>
          <div className="bg-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-6 rounded-lg shadow-md text-center border-b-2 border-blue-500">
            <p className="text-4xl font-bold text-blue-500">0</p>
            <h3 className="text-lg font-semibold text-gray-600">Job Applications</h3>
          </div>
          <div className="bg-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-6 rounded-lg shadow-md text-center border-b-2 border-blue-500">
            <p className="text-4xl font-bold text-blue-500">{InternLength || 0}</p>
            <h3 className="text-lg font-semibold text-gray-600">Internships Posted</h3>
          </div>
          <div className="bg-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-6 rounded-lg shadow-md text-center border-b-2 border-blue-500">
            <p className="text-4xl font-bold text-blue-500">{JobListLength || 0}</p>
            <h3 className="text-lg font-semibold text-gray-600">Jobs Posted</h3>
          </div>
        </div>

        {/* Main Content: Charts and Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-6">
              Monthly Activity Overview
            </h3>
            <Line data={lineChartData} options={{ responsive: true }} />
          </div>

          {/* Calendar Placeholder */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-6">
              Interview Schedule Calendar
            </h3>
            <div className="text-gray-500 flex items-center justify-center h-40">
              <p>No Interview Schedule</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
