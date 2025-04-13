import  mongoose from 'mongoose';

const quizAttemptSchema = new mongoose.Schema({
  userId: { type:String, ref: 'User' },
  quizCategory: String,
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      selectedOption: Number
    }
  ],
  score: Number,
  totalQuestions: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model('QuizAttempt', quizAttemptSchema);
