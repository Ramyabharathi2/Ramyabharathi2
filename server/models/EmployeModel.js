    // dummy component


// import React, { useState } from "react";
// import Sidebar from "../Components/SiderBar";
// import axios from "axios";

// const PostInternship = () => {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     InternshipType: "",
//     InternshipRoles: "",
//     InternshipField: "",
//     InternshipNature: "",
//     InternshipDescription: "",
//     requiredSkills: "",
//     duration: "",
//     applicationStartDate: "",
//     applicationEndDate: "",
//     Stipend: "",
//     contactEmail: "",
//     contactMobile: "",
//     companyInformation: "",
//     InternshipResponsibility: "",
//     TotalVacancies: "",
//     country: "",
//     State: "",
//     district: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   // Dropdown options
//   const internshipTypes = ["Full-Time", "Part-Time", "Remote", "Hybrid"];
//   const internshipNatures = ["Paid", "Unpaid", "Voluntary"];
//   const fields = ["Software Development", "Marketing", "Design", "Finance"];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleClear = () => {
//     setFormData({
//       companyName: "",
//       InternshipType: "",
//       InternshipRoles: "",
//       InternshipField: "",
//       InternshipNature: "",
//       InternshipDescription: "",
//       requiredSkills: "",
//       duration: "",
//       applicationStartDate: "",
//       applicationEndDate: "",
//       Stipend: "",
//       contactEmail: "",
//       contactMobile: "",
//       companyInformation: "",
//       InternshipResponsibility: "",
//       TotalVacancies: "",
//       country: "",
//       State: "",
//       district: "",
//     });
//     setErrors({});
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!formData.companyName.trim())
//       newErrors.companyName = "Company Name is required.";
//     if (!formData.InternshipRoles.trim())
//       newErrors.InternshipRoles = "Internship Role is required.";
//     if (!formData.InternshipType)
//       newErrors.InternshipType = "Please select an Internship Type.";
//     if (!formData.InternshipNature)
//       newErrors.InternshipNature = "Please select Internship Nature.";
//     if (!formData.InternshipDescription.trim())
//       newErrors.InternshipDescription = "Description is required.";
//     if (!formData.requiredSkills.trim())
//       newErrors.requiredSkills = "Required skills are mandatory.";
//     if (!formData.duration) newErrors.duration = "Duration is required.";
//     if (!formData.applicationStartDate)
//       newErrors.applicationStartDate = "Start Date is required.";
//     if (!formData.applicationEndDate)
//       newErrors.applicationEndDate = "End Date is required.";
//     if (!formData.Stipend) newErrors.Stipend = "Stipend is required.";
//     if (
//       !formData.contactEmail.trim() ||
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)
//     )
//       newErrors.contactEmail = "Please enter a valid email.";
//     if (
//       !formData.contactMobile.trim() ||
//       !/^\d{10}$/.test(formData.contactMobile)
//     )
//       newErrors.contactMobile = "Please enter a valid 10-digit mobile number.";
//     if (!formData.companyInformation.trim())
//       newErrors.companyInformation = "Company Information is required.";
//     if (!formData.InternshipResponsibility.trim())
//       newErrors.InternshipResponsibility =
//         "Internship Responsibility is required.";
//     if (!formData.TotalVacancies || formData.TotalVacancies <= 0)
//       newErrors.TotalVacancies = "Please enter a valid number of vacancies.";
//     if (!formData.country.trim()) newErrors.country = "Country is required.";
//     if (!formData.State.trim()) newErrors.State = "State is required.";
//     if (!formData.district.trim()) newErrors.district = "District is required.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; // Return true if no errors
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/intern",
//         formData
//       );
//       alert("Internship posted successfully!");
//       console.log("Form Data Submitted: ", response.data);
//       handleClear();
//     } catch (error) {
//       alert("Failed to post internship. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex">
//       <div>
//         <Sidebar />
//       </div>
//       <div className="bg-gray-100 flex justify-center items-center w-full">
//         <div className="w-[90%] sm:w-[70%] lg:w-[100%] bg-white p-8 rounded-lg shadow-lg">
//           <h2 className="text-3xl font-bold text-center mb-8 bg-blue-500 p-6 rounded-lg">
//             Post Your Internship Details
//           </h2>

//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {/* Dropdown: Internship Type */}
//               <div>
//                 <label
//                   htmlFor="InternshipType"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Internship Type
//                 </label>
//                 <select
//                   id="InternshipType"
//                   name="InternshipType"
//                   value={formData.InternshipType}
//                   onChange={handleChange}
//                   className={`mt-1 p-2 w-full border ${
//                     errors.InternshipType
//                       ? "border-red-500"
//                       : "border-gray-300"
//                   } rounded-md h-[50px]`}
//                 >
//                   <option value="">Select Internship Type</option>
//                   {internshipTypes.map((type, index) => (
//                     <option key={index} value={type}>
//                       {type}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.InternshipType && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.InternshipType}
//                   </p>
//                 )}
//               </div>

//               {/* Dropdown: Internship Nature */}
//               <div>
//                 <label
//                   htmlFor="InternshipNature"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Internship Nature
//                 </label>
//                 <select
//                   id="InternshipNature"
//                   name="InternshipNature"
//                   value={formData.InternshipNature}
//                   onChange={handleChange}
//                   className={`mt-1 p-2 w-full border ${
//                     errors.InternshipNature
//                       ? "border-red-500"
//                       : "border-gray-300"
//                   } rounded-md h-[50px]`}
//                 >
//                   <option value="">Select Internship Nature</option>
//                   {internshipNatures.map((nature, index) => (
//                     <option key={index} value={nature}>
//                       {nature}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.InternshipNature && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.InternshipNature}
//                   </p>
//                 )}
//               </div>

//               {/* Dropdown: Internship Field */}
//               <div>
//                 <label
//                   htmlFor="InternshipField"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Internship Field
//                 </label>
//                 <select
//                   id="InternshipField"
//                   name="InternshipField"
//                   value={formData.InternshipField}
//                   onChange={handleChange}
//                   className={`mt-1 p-2 w-full border ${
//                     errors.InternshipField
//                       ? "border-red-500"
//                       : "border-gray-300"
//                   } rounded-md h-[50px]`}
//                 >
//                   <option value="">Select Internship Field</option>
//                   {fields.map((field, index) => (
//                     <option key={index} value={field}>
//                       {field}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.InternshipField && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.InternshipField}
//                   </p>
//                 )}
//               </div>

//               {/* Other fields follow */}
//               {/* Add the rest of the fields here */}
//             </div>

//             <div className="flex justify-center mt-8">
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white px-6 py-3 rounded-md"
//                 disabled={loading}
//               >
//                 {loading ? "Posting Internship..." : "Post Internship"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostInternship;





// import React, { useState } from "react";
// import Sidebar from "../Components/SiderBar";
// import axios from "axios";

// const PostInternship = () => {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     InternshipType: "",
//     InternshipRoles: "",
//     InternshipField: "",
//     InternshipNature: "",
//     InternshipDescription: "",
//     requiredSkills: "",
//     duration: "",
//     applicationStartDate: "",
//     applicationEndDate: "",
//     Stipend: "",
//     contactEmail: "",
//     contactMobile: "",
//     companyInformation: "",
//     InternshipResponsibility: "",
//     TotalVacancies: "",
//     country: "",
//     State: "",
//     district: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleClear = () => {
//     setFormData({
//       companyName: "",
//       InternshipType: "",
//       InternshipRoles: "",
//       InternshipField: "",
//       InternshipNature: "",
//       InternshipDescription: "",
//       requiredSkills: "",
//       duration: "",
//       applicationStartDate: "",
//       applicationEndDate: "",
//       Stipend: "",
//       contactEmail: "",
//       contactMobile: "",
//       companyInformation: "",
//       InternshipResponsibility: "",
//       TotalVacancies: "",
//       country: "",
//       State: "",
//       district: "",
//     });
//     setErrors({});
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!formData.companyName.trim())
//       newErrors.companyName = "Company Name is required.";
//     if (!formData.InternshipRoles.trim())
//       newErrors.InternshipRoles = "Internship Role is required.";
//     if (!formData.InternshipType)
//       newErrors.InternshipType = "Please select an Internship Type.";
//     if (!formData.InternshipNature)
//       newErrors.InternshipNature = "Please select Internship Nature.";
//     if (!formData.InternshipDescription.trim())
//       newErrors.InternshipDescription = "Description is required.";
//     if (!formData.requiredSkills.trim())
//       newErrors.requiredSkills = "Required skills are mandatory.";
//     if (!formData.duration) newErrors.duration = "Duration is required.";
//     if (!formData.applicationStartDate)
//       newErrors.applicationStartDate = "Start Date is required.";
//     if (!formData.applicationEndDate)
//       newErrors.applicationEndDate = "End Date is required.";
//     if (!formData.Stipend) newErrors.Stipend = "Stipend is required.";
//     if (
//       !formData.contactEmail.trim() ||
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)
//     )
//       newErrors.contactEmail = "Please enter a valid email.";
//     if (
//       !formData.contactMobile.trim() ||
//       !/^\d{10}$/.test(formData.contactMobile)
//     )
//       newErrors.contactMobile = "Please enter a valid 10-digit mobile number.";
//     if (!formData.companyInformation.trim())
//       newErrors.companyInformation = "Company Information is required.";
//     if (!formData.InternshipResponsibility.trim())
//       newErrors.InternshipResponsibility =
//         "Internship Responsibility is required.";
//     if (!formData.TotalVacancies || formData.TotalVacancies <= 0)
//       newErrors.TotalVacancies = "Please enter a valid number of vacancies.";
//     if (!formData.country.trim()) newErrors.country = "Country is required.";
//     if (!formData.State.trim()) newErrors.State = "State is required.";
//     if (!formData.district.trim()) newErrors.district = "District is required.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0; // Return true if no errors
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/intern",
//         formData
//       );
//       alert("Internship posted successfully!");
//       console.log("Form Data Submitted: ", response.data);
//       handleClear();
//     } catch (error) {
//       alert("Failed to post internship. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex">
//       <div>
//         <Sidebar />
//       </div>
//       <div className="bg-gray-100 flex justify-center items-center w-full">
//         <div className="w-[90%] sm:w-[70%] lg:w-[100%] bg-white p-8 rounded-lg shadow-lg">
//           <h2 className="text-3xl font-bold text-center mb-8 bg-blue-500 p-6 rounded-lg">
//             Post Your Internship Details
//           </h2>

//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {[
//                 { label: "Company Name", name: "companyName" },
//                 { label: "Internship Type", name: "InternshipType" },
//                 { label: "Internship Roles", name: "InternshipRoles" },
//                 { label: "Internship Field", name: "InternshipField" },
//                 { label: "Internship Nature", name: "InternshipNature" },
//                 { label: "Internship Description", name: "InternshipDescription" },
//                 { label: "Required Skills", name: "requiredSkills" },
//                 { label: "Duration", name: "duration" },
//                 { label: "Application Start Date", name: "applicationStartDate" },
//                 { label: "Application End Date", name: "applicationEndDate" },
//                 { label: "Stipend", name: "Stipend" },
//                 { label: "Contact Email", name: "contactEmail" },
//                 { label: "Contact Mobile", name: "contactMobile" },
//                 { label: "Company Information", name: "companyInformation" },
//                 { label: "Internship Responsibility", name: "InternshipResponsibility" },
//                 { label: "Total Vacancies", name: "TotalVacancies" },
//                 { label: "Country", name: "country" },
//                 { label: "State", name: "State" },
//                 { label: "District", name: "district" },
//               ].map(({ label, name }) => (
//                 <div key={name}>
//                   <label htmlFor={name} className="block text-sm font-medium text-gray-700">
//                     {label}
//                   </label>
//                   <input
//                     id={name}
//                     name={name}
//                     type="text"
//                     value={formData[name]}
//                     onChange={handleChange}
//                     className={`mt-1 p-2 w-full border ${
//                       errors[name] ? "border-red-500" : "border-gray-300"
//                     } rounded-md h-[50px]`}
//                   />
//                   {errors[name] && (
//                     <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
//                   )}
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-center mt-8">
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white px-6 py-3 rounded-md"
//                 disabled={loading}
//               >
//                 {loading ? "Posting Internship..." : "Post Internship"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostInternship;

