const express = require("express");
const router = express.Router();
const feedbackController = require("../controller/feedbackController");

router.post("/about", feedbackController.submitFeedback);
router.get("/admin/feedback", feedbackController.getAllFeedbacks);

module.exports = router;
