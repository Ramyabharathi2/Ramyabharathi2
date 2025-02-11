import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ApplyInternship = () => {
  const [formData, setFormData] = useState({
    internshipId: "",
    applicantName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null,
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resume) {
      setMessage({ text: "Please upload your resume in PDF format!", type: "error" });
      return;
    }

    const fileExtension = formData.resume.name.split(".").pop().toLowerCase();
    if (fileExtension !== "pdf") {
      setMessage({ text: "Only PDF resumes are allowed!", type: "error" });
      return;
    }

    const url = "http://localhost:5000/api/intern/apply";
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post(url, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage({ text: response.data.message, type: "success" });

      setFormData({
        internshipId: "",
        applicantName: "",
        email: "",
        phone: "",
        coverLetter: "",
        resume: null,
      });

      navigate("/userdashboard");
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Something went wrong!", type: "error" });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Apply for Internship</h1>
      {message.text && (
        <div className={`text-center mb-4 ${message.type === "success" ? "text-green-500" : "text-red-500"}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Internship ID</label>
          <input type="text" name="internshipId" value={formData.internshipId} onChange={handleChange} required className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" placeholder="Enter Internship ID" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
          <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} required className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" placeholder="Enter your name" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" placeholder="Enter your email" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" placeholder="+91 9876543210" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Resume (PDF Only)</label>
          <input type="file" name="resume" accept="application/pdf" onChange={handleFileChange} required className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Cover Letter</label>
          <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" placeholder="Why do you want this internship?" ></textarea>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">Apply Now</button>
        </div>
      </form>
    </div>
  );
};

export default ApplyInternship;
