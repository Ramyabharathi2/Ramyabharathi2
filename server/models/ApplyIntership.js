import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    internshipId: { type: mongoose.Schema.Types.ObjectId, ref: "InternshipDetails", required: true },
    applicantName: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ },
    phone: { type: String, required: true, match: /^\+\d{1,3}\s?\d{10}$/ },
    resumeUrl: { type: String, required: true }, // URL of the uploaded resume
    coverLetter: { type: String }, // Optional
    status: { type: String, enum: ["Pending", "Reviewed", "Accepted", "Rejected"], default: "Pending" },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", ApplicationSchema);

export default Application;
