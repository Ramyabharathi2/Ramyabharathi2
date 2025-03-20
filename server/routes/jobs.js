import  express from "express";
import JobDetails from '../models/jobsmodel.js'; 
import multer from "multer";
import JobApplication from "../models/applyjob.js";
import path from "path";

const router = express.Router();
//  resume upolad part

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "uploads/resumes/");
        },
        filename: (req, file, cb) => {
          cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
        },
      });


      const fileFilter = (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
          cb(null, true);
        } else {
          cb(new Error("Only PDF files are allowed!"), false);
        }
      };

      const upload = multer({ storage, fileFilter });

// Create a new job detail
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    
    const jobDetail = new JobDetails(req.body);
    const savedJob = await jobDetail.save();
    console.log("saved****************************saved");
    
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all job details
router.get("/", async (req, res) => {
  try {
    const jobs = await JobDetails.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single job detail by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await JobDetails.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job detail not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a job detail by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedJob = await JobDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedJob) {
      return res.status(404).json({ message: "Job detail not found" });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a job detail by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedJob = await JobDetails.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job detail not found" });
    }
    res.status(200).json({ message: "Job detail deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/apply",upload.single("resume"), async (req, res) => {
  try {
    const { internshipId, applicantName, email, phone, coverLetter } = req.body;
    const existinginternship = await JobApplication.findOne({ email,internshipId });
    const resumeUrl = req.file ? `/uploads/resumes/${req.file.filename}` : null;
    console.log(resumeUrl);
    

    if (!resumeUrl) {
      return res.status(400).json({ message: "Resume upload failed!" });
    }

    if (existinginternship) {

      return res.status(400).json({ message: ' already applied this Internship !' });
      
    }

    if (!internshipId || !applicantName || !email || !phone || !resumeUrl) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    const newApplication = new JobApplication({
      internshipId,
      applicantName,
      email,
      phone,
      resumeUrl,
      coverLetter,
    });

    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({ message: "Error submitting application", error: error.message });
  }

});



export default router;
