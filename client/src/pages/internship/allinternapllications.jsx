import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Sidebar from "../../Components/Siderbar";

const InternshipApplicationsTable = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/intern/all/applications/")
      .then((res) => {
        setApplications(res.data);
      });
  }, []);

  const filteredApplications = applications.filter((app) => {
    return (
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus ? app.status === filterStatus : true)
    );
  });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredApplications);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "InternshipApplications");
    XLSX.writeFile(workbook, "InternshipApplications.xlsx");
  };

  const exportToPDF = () => {
    const input = document.getElementById("pdfContent");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("InternshipApplications.pdf");
    });
  };

  return (
    <div className="flex">
   <Sidebar />
    <div className="p-6 max-w-7xl mx-auto">
  
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Internship Applications</h2>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={exportToExcel}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Export Excel
          </button>
          <button
            onClick={exportToPDF}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Export PDF
          </button>
        </div>
      </div>

      <div id="pdfContent" className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border-b font-semibold">Name</th>
              <th className="p-3 border-b font-semibold">Email</th>
              <th className="p-3 border-b font-semibold">Phone</th>
              <th className="p-3 border-b font-semibold">Cover Letter</th>
              <th className="p-3 border-b font-semibold">Resume</th>
              <th className="p-3 border-b font-semibold">Status</th>
              <th className="p-3 border-b font-semibold">Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-all duration-150">
                <td className="p-3 border-b text-blue-700 font-medium">{app.applicantName}</td>
                <td className="p-3 border-b">
                  <a href={`mailto:${app.email}`} className="text-blue-500 underline">
                    {app.email}
                  </a>
                </td>
                <td className="p-3 border-b text-sm text-green-700">
                  <div className="flex flex-col gap-1" style={{ display: "flex", gap: "15px" }}>
                    <a href={`tel:${app.phone}`} className="hover:underline">
                      <span
                        style={{
                          color: "green",
                          backgroundColor: "blue",
                          fontSize: "24px",
                          borderRadius: "10px",
                        }}
                      >
                        📞
                      </span>{" "}
                      {app.phone}
                    </a>
                    <a
                      href={`https://wa.me/${app.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      <span
                        style={{
                          color: "green",
                          backgroundColor: "green",
                          fontSize: "24px",
                          borderRadius: "10px",
                        }}
                      >
                        💬
                      </span>{" "}
                      WhatsApp
                    </a>
                  </div>
                </td>
                <td className="p-3 border-b text-sm">{app.coverLetter || "N/A"}</td>
                <td className="p-3 border-b">
                  <a
                    href={`http://localhost:5000${app.resumeUrl}`}
                    download
                    className="text-purple-600 underline"
                  >
                    Download
                  </a>
                </td>
                <td className="p-3 border-b">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      app.status === "Pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : app.status === "Reviewed"
                        ? "bg-blue-100 text-blue-800"
                        : app.status === "Accepted"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="p-3 border-b text-xs text-gray-500">
                  {new Date(app.createdAt).toLocaleDateString()}
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

export default InternshipApplicationsTable;
