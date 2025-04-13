import React, { useState } from "react";
import jsPDF from "jspdf";

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    education: [{ degree: "", institution: "", year: "" }],
    experience: [{ company: "", role: "", duration: "", details: "" }],
    skills: "",
  });

  const handleChange = (e, index, type) => {
    if (["education", "experience"].includes(type)) {
      let updatedData = [...formData[type]];
      updatedData[index][e.target.name] = e.target.value;
      setFormData({ ...formData, [type]: updatedData });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addField = (type) => {
    setFormData({
      ...formData,
      [type]: [...formData[type], type === "education" ? { degree: "", institution: "", year: "" } : { company: "", role: "", duration: "", details: "" }]
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 20;
  
    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(formData.name, 20, y);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Email: ${formData.email} | Phone: ${formData.phone}`, 20, y + 8);
    y += 20;
  
    // Draw horizontal line
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);
    y += 6;
  
    // Summary
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Professional Summary", 20, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const summaryLines = doc.splitTextToSize(formData.summary, 170);
    doc.text(summaryLines, 25, y);
    y += summaryLines.length * 6 + 4;
  
    // Education Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Education", 20, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    formData.education.forEach((edu) => {
      doc.text(`• ${edu.degree}`, 25, y);
      y += 5;
      doc.text(`${edu.institution} (${edu.year})`, 30, y);
      y += 8;
    });
  
    // Experience Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Experience", 20, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    formData.experience.forEach((exp) => {
      doc.text(`• ${exp.role} at ${exp.company}`, 25, y);
      y += 5;
      doc.text(`Duration: ${exp.duration}`, 30, y);
      y += 5;
      const detailsLines = doc.splitTextToSize(exp.details, 160);
      doc.text(detailsLines, 30, y);
      y += detailsLines.length * 6 + 4;
    });
  
    // Skills Section
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Skills", 20, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
  
    const skillList = formData.skills.split(",").map(s => s.trim());
    let skillsText = "• " + skillList.join("\n• ");
    const skillsLines = doc.splitTextToSize(skillsText, 170);
    doc.text(skillsLines, 25, y);
  
    doc.save(`${formData.name}_Resume.pdf`);
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">ATS Resume Generator</h2>
      <div className="space-y-4">
        <input className="w-full p-2 border rounded" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input className="w-full p-2 border rounded" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input className="w-full p-2 border rounded" type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        <h3 className="text-xl font-semibold mt-4">Skills</h3>
        <textarea
          className="w-full p-2 border rounded"
          name="skills"
          placeholder="List your skills (e.g., JavaScript, React, Node.js)"
          value={formData.skills}
          onChange={handleChange}
        />

        <textarea className="w-full p-2 border rounded" name="summary" placeholder="Summary" value={formData.summary} onChange={handleChange}></textarea>
      </div>

      <h3 className="text-xl font-semibold mt-4">Education</h3>
      {formData.education.map((edu, index) => (
        <div key={index} className="space-y-2">
          <input className="w-full p-2 border rounded" type="text" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleChange(e, index, "education")} />
          <input className="w-full p-2 border rounded" type="text" name="institution" placeholder="Institution" value={edu.institution} onChange={(e) => handleChange(e, index, "education")} />
          <input className="w-full p-2 border rounded" type="text" name="year" placeholder="Year" value={edu.year} onChange={(e) => handleChange(e, index, "education")} />
        </div>
      ))}
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={() => addField("education")}>Add More Education</button>

      <h3 className="text-xl font-semibold mt-4">Experience</h3>
      {formData.experience.map((exp, index) => (
        <div key={index} className="space-y-2">
          <input className="w-full p-2 border rounded" type="text" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleChange(e, index, "experience")} />
          <input className="w-full p-2 border rounded" type="text" name="role" placeholder="Role" value={exp.role} onChange={(e) => handleChange(e, index, "experience")} />
          <input className="w-full p-2 border rounded" type="text" name="duration" placeholder="Duration" value={exp.duration} onChange={(e) => handleChange(e, index, "experience")} />
          <textarea className="w-full p-2 border rounded" name="details" placeholder="Job Description" value={exp.details} onChange={(e) => handleChange(e, index, "experience")}></textarea>
        </div>
      ))}
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={() => addField("experience")}>Add More Experience</button>

      <button className="bg-green-500 text-white px-4 py-2 rounded w-full mt-4" onClick={generatePDF}>Generate ATS Resume (PDF)</button>
    </div>
  );
};

export default ResumeForm;