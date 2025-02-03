import express from 'express'
const router = express.Router();
import Test  from '../models/Addquestion.js'; // Assuming the schema is in the "models" directory
import bodyParser from 'body-parser';

// Middleware to parse JSON bodies
router.use(bodyParser.json());

// Route to create a new test
router.post('/question', async (req, res) => {
    try {
        console.log( req.body);
        
        const { quizTitle, percentage, testDuration, questions } = req.body;
console.log({
    quizTitle,
    percentage,
    testDuration,
    questions
});

        // Create a new test document
        const newTest = new Test({
            quizTitle,
            percentage,
            testDuration,
            questions
        });

        // Save the new test to the database
        await newTest.save();

        // Respond with success message
        res.status(201).json({ message: 'Test created successfully!', test: newTest });
    } catch (error) {
        // Handle errors (e.g., validation errors)
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

const quiz=router;

export default  quiz;
