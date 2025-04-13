import  express from "express";
import InternshipDetails from "../models/Internmodel.js";
import Application from "../models/ApplyIntership.js";
import multer from "multer";
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



// Create a new internship detail
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    
    const Internship = new InternshipDetails(req.body);
    const savedIntern = await Internship.save();
    console.log("saved*******");
    
    res.status(201).json(savedIntern);
  } catch (error) {

    console.log(error);
    
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

//  apply 

router.post("/apply",upload.single("resume"), async (req, res) => {
  try {
    const { internshipId, applicantName, email, phone, coverLetter } = req.body;
    const existinginternship = await Application.findOne({ email,internshipId });
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

    const newApplication = new Application({
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




router.get("/user/:id", async (req, res) => {
  try {
   const {id}= req.params;
   console.log(id);
   
    const existinginternship = await Application.find({ email:id });
   
  
   
    res.status(201).json(existinginternship);
  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({ message: "Error  application", error: error.message });
  }

});

router.get("/all/applications/", async (req, res) => {
  try {
 
   
    const existinginternship = await Application.find();
   
  
   
    res.status(201).json(existinginternship);
  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({ message: "Error  application", error: error.message });
  }

});






export default router;
