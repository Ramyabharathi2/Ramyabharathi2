import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUser,
  FaBriefcase,
  FaClipboardCheck,
  FaEnvelope,
  FaExclamationCircle,
  FaHandshake,
  FaCalendarAlt,
  FaAngleRight, // Icon for dropdown right arrow
} from "react-icons/fa";

const Usersidebar = () => {
  const [isDropdownOpenInterview, setIsDropdownOpenInterview] = useState(false); // For Interview Questions dropdown
  const [isDropdownOpenInternship, setIsDropdownOpenInternship] = useState(false); // For Internship dropdown
  const [isDropdownOpenJob, setIsDropdownOpenJob] = useState(false); // For Job dropdown
  const [isDropdownOpenApprovedApplications, setIsDropdownOpenApprovedApplications] = useState(false); // For Approved Applications dropdown
  const [isDropdownOpenRejectedApplications, setIsDropdownOpenRejectedApplications] = useState(false); // For Rejected Applications dropdown
  const [isDropdownOpenFaceToFaceInterview, setIsDropdownOpenFaceToFaceInterview] = useState(false); // For Face-to-Face Interview dropdown
  const [isDropdownOpenOfferLeter, setisDropdownOpenOfferLeter] = useState(false); // offerleter dropdown

  return (
    <div className="max-h-max bg-blue-900 text-white w-72 flex flex-col">
      <nav className="flex-1 px-4 space-y-4">
        {/* Dashboard */}
        <NavLink
          to="/userdashboard"
          className={({ isActive }) =>
            `flex items-center py-3 px-2 rounded-md mt-4 hover:bg-blue-500 ${
              isActive ? "bg-blue-500" : ""
            }`
          }
        >
          <FaUser className="mr-2" />
          Dashboard
        </NavLink>

        {/* Interview Schedule
        <NavLink
          to="/interv"
          className={({ isActive }) =>
            `flex items-center py-3 px-2 rounded-md hover:bg-blue-500 ${
              isActive ? "bg-blue-500" : ""
            }`
          }
        >
          <FaCalendarAlt className="mr-2" />
          Interview Schedule
        </NavLink> */}

        {/* Interview Questions with Sub-Parts */}
        <div>
          <button
            onClick={() => setIsDropdownOpenInterview(!isDropdownOpenInterview)}
            className="flex items-center w-full py-3 px-2 rounded-md hover:bg-blue-500"
          >
            <FaClipboardCheck className="mr-2" />
            <span className="text-sm">Interview Questions</span>
            <FaAngleRight className="ml-auto" />
          </button>

          {isDropdownOpenInterview && (
            <div className="ml-6 mt-2 space-y-2">
              <NavLink
                to="/viewIQ"
                className={({ isActive }) =>
                  `flex items-center py-2 px-2 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                view Interview Questions
              </NavLink>
              <NavLink
                to="/exportIQ"
                className={({ isActive }) =>
                  `flex items-center py-2 px-1 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                export Interview Questions
              </NavLink>
             
             
            </div>
          )}
        </div>

        {/* Internship with Sub-Parts */}
        <div>
          <button
            onClick={() => setIsDropdownOpenInternship(!isDropdownOpenInternship)}
            className="flex items-center w-full py-3 px-2 rounded-md hover:bg-blue-500"
          >
            <FaBriefcase className="mr-2" />
            <span className="text-sm">Internships</span>
            <FaAngleRight className="ml-auto" />
          </button>

          {isDropdownOpenInternship && (
            <div className="ml-6 mt-2 space-y-2">
              <NavLink
                to="/ApplyforInternships"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                Apply for Internships
              </NavLink>
              <NavLink
                to="/ViewInternships"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                View Posted Internships
              </NavLink>
             
            </div>
          )}
        </div>

        {/* Jobs with Sub-Parts */}
        <div>
          <button
            onClick={() => setIsDropdownOpenJob(!isDropdownOpenJob)}
            className="flex items-center w-full py-3 px-2 rounded-md hover:bg-blue-500"
          >
            <FaBriefcase className="mr-2" />
            <span className="text-sm"> Jobs</span>
            <FaAngleRight className="ml-auto" />
          </button>

          {isDropdownOpenJob && (
            <div className="ml-6 mt-2 space-y-2">
            
              <NavLink
                to="/ViewPostedJobs"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                View Posted Jobs
              </NavLink>
              <NavLink
                to="/ApplyforJobs"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                Apply for Jobs
              </NavLink>
            </div>
          )}
        </div>

        {/* Approved Applications with Sub-Parts */}
        {/* <div>
          <button
            onClick={() => setIsDropdownOpenApprovedApplications(!isDropdownOpenApprovedApplications)}
            className="flex items-center w-full py-3 px-2 rounded-md hover:bg-blue-500"
          >
            <FaClipboardCheck className="mr-2" />
            <span className="text-sm">Approved Applications</span>
            <FaAngleRight className="ml-auto" />
          </button>

          {isDropdownOpenApprovedApplications && (
            <div className="ml-6 mt-2 space-y-2">
              <NavLink
                to="/ApprovedInternships"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                Internships
              </NavLink>
              <NavLink
                to="/ApprovedJobs"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                Jobs
              </NavLink>
            </div>
          )}
        </div> */}


      

      

      </nav>
    </div>
  );
};

export default Usersidebar;  