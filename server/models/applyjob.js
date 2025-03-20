import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    internshipId: { type: mongoose.Schema.Types.ObjectId, ref: "InternshipDetails", required: true },
    applicantName: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    phone: { type: String, required: true},
    resumeUrl: { type: String, required: true }, // URL of the uploaded resume
    coverLetter: { type: String }, // Optional
    status: { type: String, enum: ["Pending", "Reviewed", "Accepted", "Rejected"], default: "Pending" },
  },
  { timestamps: true }
);

const JobApplication = mongoose.model("JobApplication", ApplicationSchema);

export default JobApplication;
