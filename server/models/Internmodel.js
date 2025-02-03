import mongoose from "mongoose";

const InternshipSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    InternshipType: { type: String, required: true },
    InternshipRoles: { type: [String], required: true },
    InternshipField: { type: String, required: true },
    InternshipNature: { type: String, required: true },
    InternshipDescription: { type: String, required: true },
    requiredSkills: { type: String, required: true },
    applicationStartDate: { type: Date, required: true },
    applicationEndDate: { type: Date, required: true },
    Stipend: { type: String, required: true },
    contactEmail: { type: String, required: true, match: /.+\@.+\..+/ },
    contactMobile: {
      type: String,
      required: true,
      match: /^\+\d{1,3}\s?\d{10}$/,
    },
    companyInformation: { type: String, required: true },
    InternshipResponsibility: { type: String, required: true },
    country: { type: String, required: true },
    TotalVacancies: { type: String, required: true },
    State: { type: String, required: true },
    district: {type: String, required: true},
    duration: {type: String, required: true}

  },
  { timestamps: true }
);

// Create a model based on the schema
const InternshipDetails = mongoose.model("InternshipDetails", InternshipSchema);

export default InternshipDetails;
