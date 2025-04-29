import express from "express";
import { getInterviews, createInterview } from "../controller/interviewController.js";

const router = express.Router();

router.get("/", getInterviews);
router.post("/", createInterview);

export default router;
