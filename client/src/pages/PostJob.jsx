import React, { useState } from "react";
import Sidebar from "../Components/SiderBar";
import axios from "axios";

const PostJob = () => {
  // States for job post form
  const [companyName, setCompanyName] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [jobNature, setJobNature] = useState("");
  const [totalVacancies, setTotalVacancies] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [applicationStartDate, setApplicationStartDate] = useState("");
  const [applicationEndDate, setApplicationEndDate] = useState("");
  const [salaryPackage, setSalaryPackage] = useState("");
  const [experienceRequired, setExperienceRequired] = useState("");
  const [degreesPreferred, setDegreesPreferred] = useState("");
  const [qualification, setQualification] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [companyInformation, setCompanyInformation] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  // Options for dropdowns
  const jobTypes = ["Company Job", "Freelance", "Remote", "Internship"];
  const jobRoles = [
    "Software Engineer",
    "Web Developer",
    "Network Administrator",
    "HR",
    "Product Manager",
    "Designer",
    "Data Scientist",
    "System Analyst",
    "Database Administrator (DBA)",
    "Cybersecurity Analyst",
    "Cloud Solutions Architect",
    "DevOps Engineer",
    "Machine Learning Engineer",
  ];
  const jobNatures = ["Full-Time", "Part-Time", "Contract", "Internship"];
  const salaryRanges = ["1-2 LPA", "3-4 LPA", "5-6 LPA", "7-8 LPA", "9-10 LPA"];
  const experienceOptions = Array.from(
    { length: 10 },
    (_, i) => `${i + 1} Year`
  );
  const degrees = [
    "Bachelor of Engineering (BE) in Computer Science",
    "Information Technology",
    "Biotechnology",
    " (MTech) in Computer Science",
    "Bachelor of Technology",
    " (B.Tech) in Cybersecurity",
    "Bachelor of Computer Applications (BCA)",
    " Software Engineering",
  ];
  const countries = [
    "India",
    "USA",
    "Canada",
    "Australia",
    "UK",
    "Germany",
    "France",
    "Italy",
    "Japan",
    "China",
  ];
  const states = [
    "Tamil Nadu",
    "Maharashtra",
    "Uttar Pradesh",
    "Karnataka",
    "Gujarat",
    "Rajasthan",
    "West Bengal",
    "Andhra Pradesh",
    "Bihar",
    "Punjab",
  ];
  const districts = [
    "Theni",
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Erode",
    "Vellore",
    "Kanchipuram",
    "Thanjavur",
    "Tuticorin",
  ];

  // Handle form submission (you can connect it to an API for submission)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobDetails = {
      companyName: companyName,
      jobType: jobType,
      jobRoles:  jobRole,
      jobNature:  jobNature,
      totalVacancies: totalVacancies,
      jobDescription: jobDescription,
      requiredSkills:requiredSkills,
      applicationStartDate: applicationStartDate,
      applicationEndDate:  applicationEndDate,
      salaryPackage:  salaryPackage,
      experienceRequired:  experienceRequired,
      degreesPreferred:  degreesPreferred,
      qualification: qualification,
      contactEmail:  contactEmail,
      contactNumber:  contactNumber,
      companyInformation: companyInformation,
      accommodation:  accommodation,
      country:  country,
      state:state,
      district: district
    };
    
    console.log(jobDetails);

    try {
      const response = await axios.post('http://localhost:5000/api/job',{... jobDetails});
      console.log('Job details posted successfully:', response.data);
      alert('Job details posted successfully!');
    } catch (error) {
      console.error('Error posting job details:', error);
      alert('Error posting job details. Please try again.');
    }
    
    

  };

  return (
    <div  className="flex w-full">
      <div>
        <Sidebar />
      </div>
    <div className="bg-gray-100 flex justify-center items-center w-full ">
      {/* Main Content */}
      <div className="w-[90%] sm:w-[70%] lg:w-[100%] h-[80%] sm:h-[60%] lg:h-[100%] bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4 bg-blue-500 p-6 rounded-lg">Post Your Job</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                placeholder="Enter company name"
                required
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Type
              </label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
              >
                <option value="">Select Job Type</option>
                {jobTypes.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Role
              </label>
              <select
                type="text"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
              >
                <option value="">Select Job Role</option>
                {jobRoles.map((role, idx) => (
                  <option key={idx} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            {/* Job Nature */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Nature
              </label>
              <select
                value={jobNature}
                onChange={(e) => setJobNature(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
              >
                <option value="">Select Job Nature</option>
                {jobNatures.map((nature, idx) => (
                  <option key={idx} value={nature}>
                    {nature}
                  </option>
                ))}
              </select>
            </div>

            {/* Total Vacancies */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Vacancies
              </label>
              <select
                value={totalVacancies}
                onChange={(e) => setTotalVacancies(e.target.value)}
                className="mt-1 px-4 py-2 border rounded-md w-full"
              >
                <option value="">Select Number of Vacancies</option>
                {[1, 2, 3, 4, 5, 10, 50, 100, 200, 500, 1000].map(
                  (vacancy, idx) => (
                    <option key={idx} value={vacancy}>
                      {vacancy}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Description
              </label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[120px]" // Adjusted height here
                placeholder="Enter job description"
                required
              />
            </div>

            {/* Required Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Required Skills
              </label>
              <textarea
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[120px]" // Adjusted height here
                placeholder="Enter required skills"
                required
              />
            </div>

            {/* Application Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Application Start Date
              </label>
              <input
                type="date"
                value={applicationStartDate}
                onChange={(e) => setApplicationStartDate(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                required
              />
            </div>

            {/* Application End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Application End Date
              </label>
              <input
                type="date"
                value={applicationEndDate}
                onChange={(e) => setApplicationEndDate(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                required
              />
            </div>

            {/* Salary Package */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Salary Package
              </label>
              <select
                value={salaryPackage}
                onChange={(e) => setSalaryPackage(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
              >
                <option value="">Select Salary Package</option>
                {salaryRanges.map((range, idx) => (
                  <option key={idx} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience Required */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Experience Required
              </label>
              <select
                value={experienceRequired}
                onChange={(e) => setExperienceRequired(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
              >
                <option value="">Select Experience</option>
                {experienceOptions.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Degrees Preferred */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Degrees Preferred
              </label>
              <select
                value={degreesPreferred}
                onChange={(e) => setDegreesPreferred(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
              >
                <option value="">Select Degree</option>
                {degrees.map((degree, idx) => (
                  <option key={idx} value={degree}>
                    {degree}
                  </option>
                ))}
              </select>
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Qualification
              </label>
              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                placeholder="Enter required qualification"
                required
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                placeholder="Enter contact email"
                required
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="text"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
                placeholder="Enter contact number"
                required
              />
            </div>

            {/* Company Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Information
              </label>
              <textarea
                value={companyInformation}
                onChange={(e) => setCompanyInformation(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[120px]"
                placeholder="Enter company information"
                required
              />
            </div>

            {/* Accommodation */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Accommodation
              </label>
              <select
                value={accommodation}
                onChange={(e) => setAccommodation(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
              >
                <option value="">Select Accommodation</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
              >
                <option value="">Select Country</option>
                {countries.map((country, idx) => (
                  <option key={idx} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
              >
                <option value="">Select State</option>
                {states.map((state, idx) => (
                  <option key={idx} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                District
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md h-[50px]"
              >
                <option value="">Select District</option>
                {districts.map((district, idx) => (
                  <option key={idx} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="col-span-2 flex justify-center">
              <button
                type="submit"
                className="max-w-7xl  py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Post Job
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default PostJob;
