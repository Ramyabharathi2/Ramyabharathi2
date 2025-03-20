import mongoose from 'mongoose';

const jobDetailsSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  jobType: { type: String, required: true },
  jobRoles: { type: [String], required: true },
  jobNature: { type: String, required: true },
  totalVacancies: { type: Number, required: true },
  jobDescription: { type: String, required: true },
  requiredSkills: { type: String, required: true },
  applicationStartDate: { type: Date, required: true },
  applicationEndDate: { type: Date, required: true },
  salaryPackage: { type: String, required: true },
  experienceRequired: { type: String, required: true },
  degreesPreferred: { type: String, required: true },
  qualification: { type: String, required: true },
  contactEmail: { type: String, required: true, match: /.+\@.+\..+/ },
  contactNumber: { type: String, required: true },
  companyInformation: { type: String, required: true },
  accommodation: { type: String, required: true },
  country: { type: String, required: true },
  district: { type: String, required: true },
}, { timestamps: true });

// Create a model based on the schema
const JobDetails = mongoose.model('JobDetails', jobDetailsSchema);

export default JobDetails;


                                                      