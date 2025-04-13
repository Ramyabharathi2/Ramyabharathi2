import mongoose from  'mongoose'

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswerIndex: { type: Number, required: true },
  category: { type: String, required: true },
  marks: { type: Number, default: 1 },
  timeLimit: { type: Number, default: 60 }, // in seconds
});

export default  mongoose.model('Question', questionSchema);
