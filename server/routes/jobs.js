import  express from "express";
import JobDetails from '../models/jobsmodel.js'; 
const router = express.Router();

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

export default router;
