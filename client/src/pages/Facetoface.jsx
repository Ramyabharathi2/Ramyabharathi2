import React from "react";
import Sidebar from "../Components/SiderBar";

const FaceToFaceInterviewSchedule = () => {
  // Dummy data for interview schedules
  const interviews = [
    {
      id: 1,
      candidateName: "Alice Johnson",
      companyName: "Global Tech Inc.",
      date: "2024-12-01",
      time: "10:00 AM",
      location: "Global Tech Office, New York",
      status: "Scheduled",
    },
    {
      id: 2,
      candidateName: "Mark Taylor",
      companyName: "Cyber Solutions",
      date: "2024-12-02",
      time: "2:00 PM",
      location: "Cyber Solutions HQ, San Francisco",
      status: "Scheduled",
    },
    {
      id: 3,
      candidateName: "Sophia Davis",
      companyName: "Eco Innovators",
      date: "2024-12-03",
      time: "11:30 AM",
      location: "Eco Innovators, Boston",
      status: "Completed",
    },
  ];

  // Reusable card component
  const InterviewCard = ({
    candidateName,
    companyName,
    date,
    time,
    location,
    status,
  }) => (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold text-blue-800">{candidateName}</h3>
      <p className="text-gray-700">
        <strong>Company:</strong> {companyName}
      </p>
      <p className="text-gray-700">
        <strong>Date:</strong> {date}
      </p>
      <p className="text-gray-700">
        <strong>Time:</strong> {time}
      </p>
      <p className="text-gray-700">
        <strong>Location:</strong> {location}
      </p>
      <p
        className={`mt-2 font-semibold ${
          status === "Completed" ? "text-green-600" : "text-blue-600"
        }`}
      >
        {status}
      </p>
    </div>
  );

  return (
    <div className="flex">
        <div>
            <Sidebar/>
        </div>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">
        Face-to-Face Interview Schedule
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {interviews.map((interview) => (
          <InterviewCard
            key={interview.id}
            candidateName={interview.candidateName}
            companyName={interview.companyName}
            date={interview.date}
            time={interview.time}
            location={interview.location}
            status={interview.status}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default FaceToFaceInterviewSchedule;
