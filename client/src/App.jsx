import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Footer from "./Components/Footer";
import InterviewSchedule from "./pages/interviw schedule";
import Profile from "./pages/profile";
import MCQManager from "./pages/Mcq";
import McqLinks from "./pages/Mcq-links";
import ApprovedApplications from "./pages/ApprovedApplication";
import RejectedApplications from "./pages/Rejetedapplication";
import FaceToFaceInterviewSchedule from "./pages/Facetoface";
import AddQuestion from "./pages/addIQ";
import ImportIQ from "./pages/ImportIQ";
import EditDeleteQuestion from "./pages/EditDeleteQuestion";
import ExportQuestion from "./pages/ExportQuestion";
import PostedInternship from "./pages/PostedInternship";
import PostInternship from "./pages/PostInternship";
import PostJob from "./pages/PostJob";
import PostedJobs from "./pages/PostedJobs";
import ApprovedInternships from "./pages/ApprovedInternship";
import ApprovedJobs from "./pages/ApprovedJobs";
import RejectedInternship from "./pages/RejectedInternship";
import RejectedJobs from "./pages/RejectedJobs";
import OfferInternships from "./pages/OfferInternship";
import Offerjobs from "./pages/OfferJobs";
import F2FJobs from "./pages/face2faceJobs";
import F2fInternship from "./pages/face2faceintern";
import ApplicationsJob from "./pages/aplicationJobs";
import ReceivedApplications from "./pages/ApplicationIntership";
import EditJob from "./pages/jobEdit";
import InternEdit from "./pages/InternEdit";




const App = () => {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Interviewschedule" element={<InterviewSchedule />} />
        <Route path ="/profile"element={<Profile/>} />
        <Route path ="/MCQ"element={<MCQManager/>} />
        <Route path ="/MCQ-Links"element={<McqLinks/>} />
        <Route path ="/ApprovedApplications"element={<ApprovedApplications/>} />
        <Route path ="/RejectedApplications"element={<RejectedApplications/>} />
        <Route path ="/FaceToFaceInterviewSchedule"element={<FaceToFaceInterviewSchedule/>} />
        <Route path="/AddIQ" element={<AddQuestion/>} />
        <Route path="/ImportIQ" element={<ImportIQ />} />
        <Route path="/EditDeleteQuestion" element={<EditDeleteQuestion />} />
        <Route path="/ExportQuestion" element={<ExportQuestion />} />
        <Route path="/PostedInternship" element={<PostedInternship />} />
        <Route path="/PostInternship" element={<PostInternship/>} />
        <Route path="/PostJob" element={<PostJob/>} />
        <Route path="/editJob/:id" element={<EditJob/>} />
        <Route path="/editIntern/:id" element={<InternEdit/>} />


        <Route path="/PostedJobs" element={<PostedJobs/>} />
        <Route path="/ApprovedInternships" element={<ApprovedInternships/>} />
        <Route path="/ApprovedJobs" element={<ApprovedJobs/>} />
        <Route path="/RejectedInternship" element={<RejectedInternship/>} />
        <Route path="/RejectedJobs" element={<RejectedJobs/>} />
        <Route path="/OfferInternships" element={<OfferInternships/>} />
        <Route path="/Offerjobs" element={<Offerjobs/>} />
        <Route path="/F2FJobs" element={<F2FJobs/>} />
        <Route path="/F2fInternship" element={<F2fInternship/>} />
        <Route path="/ApplicationsJob" element={<ApplicationsJob/>} />
        <Route path="/ApplicationsIntern" element={<ReceivedApplications/>} />


        
        






      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
