import React, { useState } from "react";
import Sidebar from "../Components/SiderBar";
import axios from "axios";

const PostInternship = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    InternshipType: "",
    InternshipRoles: "",
    InternshipField: "",
    InternshipNature: "",
    InternshipDescription: "",
    requiredSkills: "",
    duration: "",
    applicationStartDate: "",
    applicationEndDate: "",
    Stipend: "",
    contactEmail: "",
    contactMobile: "",
    companyInformation: "",
    InternshipResponsibility: "",
    TotalVacancies: "",
    country: "",
    State: "",
    district: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleclear=()=>{
    setFormData({
      companyName: "",
      InternshipType: "",
      InternshipRoles: "",
      InternshipField: "",
      InternshipNature: "",
      InternshipDescription: "",
      requiredSkills: "",
      duration: "",
      applicationStartDate: "",
      applicationEndDate: "",
      Stipend: "",
      contactEmail: "",
      contactMobile: "",
      companyInformation: "",
      InternshipResponsibility: "",
      TotalVacancies: "",
      country: "",
      State: "",
      district: "",
    })
  }

 
  
  const validate = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) newErrors.companyName = "Company Name is required.";
    if (!formData.InternshipRoles.trim()) newErrors.InternshipRoles = "Internship Role is required.";
    if (!formData.InternshipType) newErrors.InternshipType = "Please select an Internship Type.";
    if (!formData.InternshipNature) newErrors.InternshipNature = "Please select Internship Nature.";
    if (!formData.InternshipDescription.trim()) newErrors.InternshipDescription = "Description is required.";
    if (!formData.requiredSkills.trim()) newErrors.requiredSkills = "Required skills are mandatory.";
    if (!formData.duration) newErrors.duration = "Duration is required.";
    if (!formData.applicationStartDate) newErrors.applicationStartDate = "Start Date is required.";
    if (!formData.applicationEndDate) newErrors.applicationEndDate = "End Date is required.";
    if (!formData.Stipend) newErrors.Stipend = "Stipend is required.";
    if (!formData.contactEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail))
      newErrors.contactEmail = "Please enter a valid email.";
    if (!formData.contactMobile.trim() || !/^\d{10}$/.test(formData.contactMobile))
      newErrors.contactMobile = "Please enter a valid 10-digit mobile number.";
    if (!formData.companyInformation.trim())
      newErrors.companyInformation = "Company Information is required.";
    if (!formData.InternshipResponsibility.trim())
      newErrors.InternshipResponsibility = "Internship Responsibility is required.";
    if (!formData.TotalVacancies || formData.TotalVacancies <= 0)
      newErrors.TotalVacancies = "Please enter a valid number of vacancies.";
    if (!formData.country.trim()) newErrors.country = "Country is required.";
    if (!formData.State.trim()) newErrors.State = "State is required.";
    if (!formData.district.trim()) newErrors.district = "District is required.";

    // setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
   

    // Start loading indicator
    setLoading(true);

    // Simulate API call or form submission
    setTimeout(async () => {
      setLoading(false);
     try {
      
      const response = await axios.post("http://localhost:5000/api/intern",formData);
    
      alert("Internship posted successfully!");

     } catch (error) {

      console.log(error);
      
      
     }
      // Logic to send form data to a backend API can go here
      console.log("Form Data Submitted: ", formData);
      handleclear()
    }, 2000);
  };


  return (
    <div className="flex">
      <div  >
        <Sidebar />
      </div>
      <div className="bg-gray-100 flex justify-center items-center w-full">
        <div className="w-[90%] sm:w-[70%] lg:w-[100%] h-[80%] sm:h-[60%] lg:h-[100%] bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8 bg-blue-500 p-6 rounded-lg">Post Your Internship Details</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                />
              </div>

              <div>
                <label htmlFor="internshipRole" className="block text-sm font-medium text-gray-700">
                  Internship Role
                </label>
                <input
                  id="InternshipRole"
                  type="text"
                  name="InternshipRoles"
                  value={formData.InternshipRoles}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                />
              </div>

              <div>
                <label htmlFor="internshipType" className="block text-sm font-medium text-gray-700">
                  Internship Type
                </label>
                <select
                  id="internshipType"
                  name="InternshipType"
                  value={formData.InternshipType}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                >
                  <option value="">Select Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              

              <div>
                <label htmlFor="internshipNature" className="block text-sm font-medium text-gray-700">
                  Internship Nature
                </label>
                <select
                  id="internshipNature"
                  name="InternshipNature"
                  value={formData.InternshipNature}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                >
                  <option value="">Select Nature</option>
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>

              <div>
                <label htmlFor="internshipDescription" className="block text-sm font-medium text-gray-700">
                  Internship Description
                </label>
                <textarea
                  id="internshipDescription"
                  name="InternshipDescription"
                  value={formData.InternshipDescription}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[120px]"
                />
              </div>

              <div>
                <label htmlFor="requiredSkills" className="block text-sm font-medium text-gray-700">
                  Required Skills
                </label>
                <textarea
                  id="requiredSkills"
                  name="requiredSkills"
                  value={formData.requiredSkills}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[120px]"
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                  Duration (in months)
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                >
                  <option value="">Select Duration</option>
                  <option value="1">1 Month</option>
                  <option value="2">2 Months</option>
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                  <option value="12">12 Months</option>
                </select>
              </div>

              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Application Start Date
                </label>
                <input
                  id="startDate"
                  type="date"
                  name="applicationStartDate"
                  value={formData.applicationStartDate}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  Application End Date
                </label>
                <input
                  id="endDate"
                  type="date"
                  name="applicationEndDate"
                  value={formData.applicationEndDate}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                />
              </div>

              <div>
                <label htmlFor="stipend" className="block text-sm font-medium text-gray-700">
                  Stipend
                </label>
                <select
                  id="stipend"
                  name="Stipend"
                  value={formData.Stipend}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                >
                  <option value="">Select Stipend</option>
                  <option value="5000">₹5000</option>
                  <option value="10000">₹10000</option>
                  <option value="15000">₹15000</option>
                </select>
              </div>

              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                  Contact Email
                </label>
                <input
                  id="contactEmail"
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                />
              </div>

              <div>
                <label htmlFor="contactMobile" className="block text-sm font-medium text-gray-700">
                  Contact Mobile
                </label>
                <input
                  id="contactMobile"
                  type="tel"
                  name="contactMobile"
                  value={formData.contactMobile}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                />
              </div>

              <div>
                <label htmlFor="companyInfo" className="block text-sm font-medium text-gray-700">
                  Company Information
                </label>
                <textarea
                  id="companyInfo"
                  name="companyInformation"
                  value={formData.companyInformation}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[120px]"
                />
              </div>

              <div>
                <label htmlFor="internshipResponsibility" className="block text-sm font-medium text-gray-700">
                  Internship Responsibility
                </label>
                <textarea
                  id="internshipResponsibility"
                  name="InternshipResponsibility"
                  value={formData.InternshipResponsibility}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[120px]"
                />
              </div>

              <div>
                <label htmlFor="totalVacancies" className="block text-sm font-medium text-gray-700">
                  Total Vacancies
                </label>
                <input
                  id="totalVacancies"
                  type="number"
                  name="TotalVacancies"
                  value={formData.TotalVacancies}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  name="State"
                  value={formData.State}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                />
              </div>

              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                  District
                </label>
                <input
                  id="district"
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                />
              </div>

            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-md"
                // disabled={loading}
              >
                {loading ? "Posting Internship..." : "Post Internship"} 
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostInternship; 