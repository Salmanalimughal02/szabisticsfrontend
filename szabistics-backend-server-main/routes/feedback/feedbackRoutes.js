const express = require("express");
const router = express.Router();

const {
  getAllFeebacks,
  submitFeedback,
} = require("../../controllers/feedback/feedbackController");

const {
  authenticateUser,
  validateIsOwner,
  validateIsDriver,
} = require("../../middlewares/Auth");

router.post(
  "/submit-feedback",
  authenticateUser,
  validateIsOwner,
  submitFeedback
);

router.get("/get-all-feedbacks/:driverId", authenticateUser, getAllFeebacks);

module.exports = router;
