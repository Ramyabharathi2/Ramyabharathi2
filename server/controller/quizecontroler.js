import Question from '../models/Addquestion.js';
import QuizAttempt from '../models/quizeattempt.js';

// Add a question
export const addQuestion = async (req, res) => {
    try {
        const data = req.body;
        const result = Array.isArray(data)
          ? await Question.insertMany(data)
          : await new Question(data).save();
        res.status(201).json(result);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
};

// Add a question
export const getAllQuestion = async (req, res) => {
    try {
      const question = await Question.find();
    
      res.status(201).json({ success: true,question  });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };

// Get all questions by category
export const getQuestionsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const questions = await Question.find({ category });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete question
export const deleteQuestion = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Submit quiz
export const submitQuiz = async (req, res) => {
  try {
    const { userId, quizCategory, answers } = req.body;
    let score = 0;

    for (const ans of answers) {
      const question = await Question.findById(ans.questionId);
      if (question.correctAnswerIndex === ans.selectedOption) {
        score += question.marks;
      }
    }

    const attempt = new QuizAttempt({
      userId,
      quizCategory,
      answers,
      score,
      totalQuestions: answers.length
    });

    await attempt.save();
    res.json({ success: true, message: 'Quiz submitted!', score });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user attempts
export const getAttempts = async (req, res) => {
  try {
    const { userId } = req.params;
    const attempts = await QuizAttempt.find({ userId }).populate('answers.questionId');
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getallAttempts = async (req, res) => {
  try {
    
    const attempts = await QuizAttempt.find()
    res.json(attempts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
