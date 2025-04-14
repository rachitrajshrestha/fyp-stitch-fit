const { Feedback } = require("../models");

const submitFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const userId = req.userId || null;

    const feedback = await Feedback.create({ name, email, message, userId });

    return res.status(201).json({ message: "Feedback submitted", feedback });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    return res.json(feedbacks);
  } catch (error) {
    console.error("Error retrieving feedbacks:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  submitFeedback,
  getAllFeedbacks,
};
