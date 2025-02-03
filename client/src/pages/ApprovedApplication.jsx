import React from "react";
import Sidebar from "../Components/SiderBar";

const ApprovedApplications = () => {
  // Dummy data for each category
  const approvedData = {
    fullTimeJobs: [
      {
        id: 1,
        companyName: "Tech Innovators Inc.",
        candidateName: "John Doe",
        status: "Approved",
      },
      {
        id: 2,
        companyName: "NextGen Solutions",
        candidateName: "Jane Smith",
        status: "Approved",
      },
    ],
    partTimeJobs: [
      {
        id: 3,
        companyName: "AI Ventures Ltd.",
        candidateName: "Michael Brown",
        status: "Approved",
      },
    ],
    fullTimeInternships: [
      {
        id: 4,
        companyName: "Green Energy Corp.",
        candidateName: "Sarah Lee",
        status: "Approved",
      },
    ],
    partTimeInternships: [
      {
        id: 5,
        companyName: "StartUp Hub",
        candidateName: "Chris Wilson",
        status: "Approved",
      },
    ],
  };

  // Reusable card component
  const ApplicationCard = ({ companyName, candidateName, status }) => (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold text-blue-900">{companyName}</h3>
      <p className="text-gray-700">Candidate: {candidateName}</p>
      <p className="text-green-600 font-semibold mt-2">{status}</p>
    </div>
  );

  return (


    <div className="flex">

        <div>
            <Sidebar/>
        </div>

   
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">
        Approved Applications
      </h1>

      {/* Full-Time Jobs */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Full-Time Jobs
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {approvedData.fullTimeJobs.map((job) => (
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
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Part-Time Jobs
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {approvedData.partTimeJobs.map((job) => (
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
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Full-Time Internships
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {approvedData.fullTimeInternships.map((internship) => (
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
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Part-Time Internships
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {approvedData.partTimeInternships.map((internship) => (
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

export default ApprovedApplications;
