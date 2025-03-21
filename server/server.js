import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cors from 'cors';
import path from "path";
import fs from "fs";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// const uploadDir = path.join(__dirname, "uploads");

import jobRoutes from './routes/jobs.js';
import  InternRoutes from './routes/Intern.js'
import quiz from './routes/addquiz.js';



// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/jobportal', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));




// Employee Schema
const employeeSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    mobile: String,
    role:String
});

const Employee = mongoose.model('Employee', employeeSchema);


export default Employee;


// Signup Route
app.post('/signup', async (req, res) => {
    const { name, email, password, mobile,role } = req.body;
    try {
        // Check if the email already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Email already registered!' });
        }

        // Hash the password and save the new employee
        const hashedPassword = await bcrypt.hash(password, 10);
        const newEmployee = new Employee({ name, email, password: hashedPassword, mobile,role });
        await newEmployee.save();

        res.status(201).json({ message: 'Employee registered successfully!' });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the employee exists
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(400).json({ message: 'Invalid email or password!' });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password!' });
        }

        res.json({ 
            message: 'Login successful!',
            data:{
                name:employee.name,
                email:employee.email,
                mobile:employee.mobile,
                role:employee.role
            }
         });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Something went wrong!' });
    }
});



app.use("/api/job", jobRoutes);
app.use("/api/intern",InternRoutes)
app.use("/api/addquiz",quiz)
//   
// Start the server"
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
