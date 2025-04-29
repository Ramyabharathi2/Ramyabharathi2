import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  notes: { type: String },
});

const Interview = mongoose.model("Interview", interviewSchema);
export default Interview;
