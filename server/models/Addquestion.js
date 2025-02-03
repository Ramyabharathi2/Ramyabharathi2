import  mongoose from   'mongoose';

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required'],
    trim: true
  },
  options: [
    {
      type: String,
      required: [true, 'Option is required'],
      trim: true
    }
  ]
});

const addquizSchema = new mongoose.Schema({
  quizTitle: {
    type: String,
    required: [true, 'Quiz Title is required'],
    trim: true
  },
  percentage: {
    type: Number,
    required: [true, 'Qualification Percentage is required'],
    min: [1, 'Percentage must be at least 1'],
    max: [100, 'Percentage must be less than or equal to 100']
  },
  testDuration: {
    type: Number,
    required: [true, 'Test Duration is required'],
    min: [1, 'Test duration must be at least 1 minute']
  },
  questions: [questionSchema],
}, {
  timestamps: true
});

const addquiz = mongoose.model('addquizTest', addquizSchema);

export default  addquiz;
