import Interview from "../models/Interview.js";

export const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find();
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createInterview = async (req, res) => {
  try {
    const { title, start, end, notes } = req.body;
    const newInterview = new Interview({ title, start, end, notes });
    await newInterview.save();
    res.status(201).json(newInterview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
