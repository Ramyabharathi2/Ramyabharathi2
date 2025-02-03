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

const Sidebar = () => {
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
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center py-3 px-2 rounded-md mt-4 hover:bg-blue-500 ${
              isActive ? "bg-blue-500" : ""
            }`
          }
        >
          <FaUser className="mr-2" />
          Dashboard
        </NavLink>

        {/* Interview Schedule */}
        <NavLink
          to="/Interviewschedule"
          className={({ isActive }) =>
            `flex items-center py-3 px-2 rounded-md hover:bg-blue-500 ${
              isActive ? "bg-blue-500" : ""
            }`
          }
        >
          <FaCalendarAlt className="mr-2" />
          Interview Schedule
        </NavLink>

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
                to="/AddIQ"
                className={({ isActive }) =>
                  `flex items-center py-2 px-2 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                Add Interview Questions
              </NavLink>
              <NavLink
                to="/ImportIQ"
                className={({ isActive }) =>
                  `flex items-center py-2 px-1 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                Import Interview Questions
              </NavLink>
              <NavLink
                to="/EditDeleteQuestion"
                className={({ isActive }) =>
                  `flex items-center py-2 px-1 rounded-md hover:bg-blue-500  ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                Edit/Delete Interview Questions
              </NavLink>
              <NavLink
                to="/ExportQuestion"
                className={({ isActive }) =>
                  `flex items-center py-2 px-1 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                Export Interview Questions
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
                to="/PostInternship"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                Post Internship
              </NavLink>
              <NavLink
                to="/PostedInternship"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                Posted Internships
              </NavLink>
              <NavLink
                to="/ApplicationsIntern"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                Applications
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
            <span className="text-sm">Jobs</span>
            <FaAngleRight className="ml-auto" />
          </button>

          {isDropdownOpenJob && (
            <div className="ml-6 mt-2 space-y-2">
              <NavLink
                to="/PostJob"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                Post Job
              </NavLink>
              <NavLink
                to="/PostedJobs"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                Posted Jobs
              </NavLink>
              <NavLink
                to="/ApplicationsJob"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                Applications
              </NavLink>
            </div>
          )}
        </div>

        {/* Approved Applications with Sub-Parts */}
        <div>
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
        </div>

        {/* Rejected Applications with Sub-Parts */}
        <div>
          <button
            onClick={() => setIsDropdownOpenRejectedApplications(!isDropdownOpenRejectedApplications)}
            className="flex items-center w-full py-3 px-2 rounded-md hover:bg-blue-500"
          >
            <FaExclamationCircle className="mr-2" />
            <span className="text-sm">Rejected Applications</span>
            <FaAngleRight className="ml-auto" />
          </button>

          {isDropdownOpenRejectedApplications && (
            <div className="ml-6 mt-2 space-y-2">
              <NavLink
                to="/RejectedInternship"
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
                to="/RejectedJobs"
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
        </div>

        {/* Face-to-Face Interview with Sub-Parts */}
        <div>
          <button
            onClick={() => setIsDropdownOpenFaceToFaceInterview(!isDropdownOpenFaceToFaceInterview)}
            className="flex items-center w-full py-3 px-2 rounded-md hover:bg-blue-500"
          >
            <FaHandshake className="mr-2" />
            <span className="text-sm">Face-to-Face Interview</span>
            <FaAngleRight className="ml-auto" />
          </button>

          {isDropdownOpenFaceToFaceInterview && (
            <div className="ml-6 mt-2 space-y-2">
              <NavLink
                to="/F2fInternship"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                Internship
              </NavLink>
              <NavLink
                to="/F2FJobs"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                Job
              </NavLink>
            </div>
          )}
        </div>

        {/* offerLeter with Sub-Parts */}
        <div>
          <button
            onClick={() =>  setisDropdownOpenOfferLeter(!isDropdownOpenOfferLeter)}
            className="flex items-center w-full py-3 px-2 rounded-md hover:bg-blue-500"
          >
            <FaEnvelope className="mr-2" />
            <span className="text-sm">Offer Letter</span>
            <FaAngleRight className="ml-auto" />
          </button>

          { isDropdownOpenOfferLeter && (
            <div className="ml-6 mt-2 space-y-2">
              <NavLink
                to="/OfferInternships"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                Internship
              </NavLink>
              <NavLink
                to="/Offerjobs"
                className={({ isActive }) =>
                  `flex items-center py-2 px-4 rounded-md hover:bg-blue-500 whitespace-nowrap ${
                    isActive ? "bg-blue-500" : ""
                  }`
                }
              >
                <span className="mr-2">></span>
                Job
              </NavLink>
            </div>
          )}
        </div>

      </nav>
    </div>
  );
};

export default Sidebar;  