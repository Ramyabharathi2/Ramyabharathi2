import React from "react";
import Sidebar from "../Components/SiderBar";

const RejectedApplications = () => {
  // Dummy data for each category
  const rejectedData = {
    fullTimeJobs: [
      {
        id: 1,
        companyName: "Global Tech Inc.",
        candidateName: "Alice Johnson",
        status: "Rejected",
      },
      {
        id: 2,
        companyName: "Cyber Solutions",
        candidateName: "Mark Taylor",
        status: "Rejected",
      },
    ],
    partTimeJobs: [
      {
        id: 3,
        companyName: "E-Learn Services",
        candidateName: "Daniel Green",
        status: "Rejected",
      },
    ],
    fullTimeInternships: [
      {
        id: 4,
        companyName: "Eco Innovators",
        candidateName: "Sophia Davis",
        status: "Rejected",
      },
    ],
    partTimeInternships: [
      {
        id: 5,
        companyName: "Startup Co.",
        candidateName: "James Wilson",
        status: "Rejected",
      },
    ],
  };

  // Reusable card component
  const ApplicationCard = ({ companyName, candidateName, status }) => (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold text-red-800">{companyName}</h3>
      <p className="text-gray-700">Candidate: {candidateName}</p>
      <p className="text-red-600 font-semibold mt-2">{status}</p>
    </div>
  );

  return (

    <div className="flex">
        <div>
            <Sidebar/>
        </div>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-red-800">
        Rejected Applications
      </h1>

      {/* Full-Time Jobs */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-red-700 mb-4">
          Full-Time Jobs
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rejectedData.fullTimeJobs.map((job) => (
            <ApplicationCard
              key={job.id}
              companyName={job.companyName}
              candidateName={job.candidateName}
              status={job.status}
            />
          ))}
        </div>
      </div>

      {/* Part-Time Jobs */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-red-700 mb-4">
          Part-Time Jobs
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rejectedData.partTimeJobs.map((job) => (
            <ApplicationCard
              key={job.id}
              companyName={job.companyName}
              candidateName={job.candidateName}
              status={job.status}
            />
          ))}
        </div>
      </div>

      {/* Full-Time Internships */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-red-700 mb-4">
          Full-Time Internships
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rejectedData.fullTimeInternships.map((internship) => (
            <ApplicationCard
              key={internship.id}
              companyName={internship.companyName}
              candidateName={internship.candidateName}
              status={internship.status}
            />
          ))}
        </div>
      </div>

      {/* Part-Time Internships */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-red-700 mb-4">
          Part-Time Internships
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rejectedData.partTimeInternships.map((internship) => (
            <ApplicationCard
              key={internship.id}
              companyName={internship.companyName}
              candidateName={internship.candidateName}
              status={internship.status}
            />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default RejectedApplications;
