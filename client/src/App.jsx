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
import UserDashboard from "./pages/user/userdashboard";
import AdminSignup from "./pages/AdminSinup";
import Applyinternship from "./pages/user/Applyinternship";
import ApplyInternship from "./pages/user/Applyinternship";
import ApplyJob from "./pages/user/applyjob";
import InternshipList from "./pages/internship/intershiplistuser";
import UserjobList from "./pages/jobs/viewpostedjobs";
import IntershipuserApplicationList from "./pages/internship/viewintershipapplications";
import InternshipDetailsPage from "./pages/internship/viewinterdetils";
import Viewuserjobapplylist from "./pages/jobs/viewuserjobapplylist";
import JobDetailsPage from "./pages/jobs/viewjobDetails";
import ResumeForm from "./pages/resumebuilder/resumebuilder";
import SkillLearningPage from "./pages/skilllearning/skill";
import UnauthorizedPage from "./Components/unauth";
import AddQuestion from "./pages/quize/addquize";
import ViewQuestions from "./pages/quize/getallqustions";
import PlayQuiz from "./pages/quize/userAttendthequize";
import ApplicationsTable from "./pages/jobs/viewalljobApplication";
import InternshipApplicationsTable from "./pages/internship/allinternapllications";
import ViewQuestionsAdmin from "./pages/quize/allQuizesTable";




const App = () => {

  const storedUser = JSON.parse(localStorage.getItem("userData"));

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/register" element={<AdminSignup />} />
        <Route path="/resume-builder" element={<ResumeForm />} />
        <Route path="/skill-learning" element={<SkillLearningPage />} />
       
        
        <Route path="/view-questions" element={<ViewQuestions />} />
        <Route path="/playquiz" element={<PlayQuiz />} />
        
        {
          storedUser && storedUser.role === "admin" ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Interviewschedule" element={<InterviewSchedule />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/PostedInternship" element={<PostedInternship />} />
              <Route path="/PostInternship" element={<PostInternship />} />
              <Route path="/PostJob" element={<PostJob />} />
              <Route path="/editJob/:id" element={<EditJob />} />
              <Route path="/editIntern/:id" element={<InternEdit />} />
              <Route path="/PostedJobs" element={<PostedJobs />} />
              <Route path="/ApplicationsIntern" element={<><InternshipApplicationsTable/></>} />
              <Route path="/ApplicationsJob" element={<><ApplicationsTable/></>} />
              <Route path="/ViewQuestionsAdmin" element={<><ViewQuestionsAdmin/></>} />
              <Route path="/add-question" element={<AddQuestion />} />
              
              {/* ApplicationsJob */}
            
            </>
          ) : (
            <>
              <Route path="/userDashboard" element={<UserDashboard />} />
              <Route path="/Interapply/:id" element={<ApplyInternship />} />
              <Route path="/jobapply/:id" element={<ApplyJob />} />
              <Route path="/ApplicationDetails/:id" element={<InternshipDetailsPage />} />
              <Route path="/JobDetails/:id" element={<JobDetailsPage />} />
              <Route path="/ApplyforInternships" element={<IntershipuserApplicationList />} />
              <Route path="/ApplyforJobs" element={<Viewuserjobapplylist />} />
              <Route path="/ViewInternships" element={<InternshipList />} />
              <Route path="/ViewPostedJobs" element={<UserjobList />} />
            </>
          )
        }
        <Route path="/*" element={<UnauthorizedPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
