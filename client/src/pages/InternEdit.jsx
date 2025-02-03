import React, { useEffect, useState } from "react";
import Sidebar from "../Components/SiderBar";
import { useParams } from "react-router-dom";
import axios from "axios";

const InternEdit = () => {
    const { id } = useParams();
  const [formData, setFormData] = useState({
    companyName: "",
    internshipRole: "",
    InternshipType: "",
    internshipField: "",
    internshipNature: "",
    internshipDescription: "",
    requiredSkills: "",
    duration: "",
    applicationStartDate: "",
    applicationEndDate: "",
    stipend: "",
    contactEmail: "",
    contactMobile: "",
    companyInfo: "",
    internshipResponsibility: "",
    totalVacancies: "",
    country: "",
    state: "",
    district: "",
  });

  const [loading, setLoading] = useState(false);
  const [clear, setclear]=useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
};


const initiateupdatedata = async () => {
    const response = await axios.get("http://localhost:5000/api/Intern/" + id);
    
    console.log(response.data);
    setFormData({
        companyName: response.data.companyName,
        internshipRole:response.data.InternshipRoles[0] ,
        InternshipType:response.data.InternshipType ,
        internshipField:response.data.InternshipField ,
        internshipNature:response.data.InternshipNature ,
        internshipDescription:response.data.InternshipDescription ,
        requiredSkills:response.data.requiredSkills,
        duration:response.data.duration,
        applicationStartDate: response.data.applicationStartDate.split("T")[0],
        applicationEndDate: response.data.applicationEndDate.split("T")[0],
        stipend: response.data.Stipend,
        contactEmail: response.data.contactEmail,
        contactMobile: response.data.contactMobile,
        companyInfo: response.data.companyInformation,
        internshipResponsibility: response.data.InternshipResponsibility,
        totalVacancies: response.data.TotalVacancies,
        country: response.data.country,
        state: response.data.State,
        district: response.data.district,
    });
};


const handleClear = ()=>{
   setFormData({
       companyName: "",
       internshipRole:"" ,
       InternshipType:"",
       internshipField:"" ,
       internshipNature:"" ,
       internshipDescription:"" ,
       requiredSkills:"",
       duration:"",
       applicationStartDate: "",
       applicationEndDate: "",
       stipend: "",
       contactEmail: "",
       contactMobile:"",
       companyInfo: "",
       internshipResponsibility: "",
       totalVacancies: "",
       country: "",
       state: "",
       district: "",
     });
}

     useEffect(()=>{
        if (clear) {
            console.log("eeeeeeeeeeeeeeee");
            
            handleClear()
        }else{

            initiateupdatedata()
        }
     },[clear])
    

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.contactEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Start loading indicator
    setLoading(true);

    // Simulate API call or form submission
    setTimeout(async () => {
      setLoading(false);
      const response = await axios.put("http://localhost:5000/api/Intern/" + id,formData);
    //   alert("Internship update successfully!");
      initiateupdatedata()
      // Logic to send form data to a backend API can go here
    setclear(true)
    handleClear()
      console.log("Form Data Submitted: ", formData);
    }, 100);
  };

  return (
    <div className="flex">
      <div  >
        <Sidebar />
      </div>
      <div className="bg-gray-100 flex justify-center items-center w-full">
        <div className="w-[90%] sm:w-[70%] lg:w-[100%] h-[80%] sm:h-[60%] lg:h-[100%] bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8 bg-blue-500 p-6 rounded-lg">Edit Internship Details</h2>
         
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
                  id="internshipRole"
                  type="text"
                  name="internshipRole"
                  value={formData.internshipRole}
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
                <label htmlFor="internshipField" className="block text-sm font-medium text-gray-700">
                  Internship Field
                </label>
                <select
                  id="internshipField"
                  name="internshipField"
                  value={formData.internshipField}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                >
                  <option value="">Select Field</option>
                  <option value="Technology">Technology</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Design">Design</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>

              <div>
                <label htmlFor="internshipNature" className="block text-sm font-medium text-gray-700">
                  Internship Nature
                </label>
                <select
                  id="internshipNature"
                  name="internshipNature"
                  value={formData.internshipNature}
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
                  name="internshipDescription"
                  value={formData.internshipDescription}
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
                  name="stipend"
                  value={formData.stipend}
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
                  name="companyInfo"
                  value={formData.companyInfo}
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
                  name="internshipResponsibility"
                  value={formData.internshipResponsibility}
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
                  name="totalVacancies"
                  value={formData.totalVacancies}
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
                  name="state"
                  value={formData.state}
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
                disabled={loading}
              >
                {loading ? "updated Internship..." : "update Internship"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InternEdit;
