import express from 'express';
import {
  addQuestion,
  getQuestionsByCategory,
  deleteQuestion,
  submitQuiz,
  getAttempts,
  getAllQuestion,
  getallAttempts
} from '../controller/quizecontroler.js';

const router = express.Router();

router.post('/add', addQuestion);
router.get("/",getAllQuestion)
router.get('/category/:category', getQuestionsByCategory);
router.delete('/:id', deleteQuestion);
router.post('/submit', submitQuiz);
router.get('/attempts/:userId', getAttempts);
router.get('/all/attempts', getallAttempts);


export default router;
