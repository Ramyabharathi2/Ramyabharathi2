import  express from "express";
import InternshipDetails from "../models/Internmodel.js";
const router = express.Router();

// Create a new internship detail
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    
    const Internship = new InternshipDetails(req.body);
    const savedIntern = await Internship.save();
    console.log("saved*******");
    
    res.status(201).json(savedIntern);
  } catch (error) {

    res.status(400).json({ error: error.message });
  }
});

// Get all internship details
router.get("/", async (req, res) => {
  try {
    const intern = await InternshipDetails.find();
    res.status(200).json(intern);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single internship detail by ID
router.get("/:id", async (req, res) => {
  try {
    const intern = await InternshipDetails.findById(req.params.id);
    if (!intern) {
      return res.status(404).json({ message: "intern detail not found" });
    }
    res.status(200).json(intern);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a intership detail by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedIntern = await InternshipDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedIntern) {
      return res.status(404).json({ message: "Intern detail not found" });
    }
    res.status(200).json(updatedIntern);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a internship detail by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedIntern = await InternshipDetails.findByIdAndDelete(req.params.id);
    if (!deletedIntern) {
      return res.status(404).json({ message: "internship detail not found" });
    }
    res.status(200).json({ message: "internship detail deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
