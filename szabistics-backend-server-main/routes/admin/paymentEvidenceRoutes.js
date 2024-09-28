const express = require("express");
const router = express.Router();

const {
  createPaymentEvidence,
  getAllPaymentEvidences,
  updatePaymentEvidenceStatus,
} = require("../../controllers/paymentEvidence/paymentEvidenceController");

const {
  authenticateUser,
  validateIsAdmin,
  validateIsOwner,
} = require("../../middlewares/Auth");

router.post(
  "/submit-evidence/:packageId",
  authenticateUser,
  validateIsOwner,
  createPaymentEvidence
);

router.patch(
  "/update-status/:paymentEvidenceId",
  authenticateUser,
  validateIsAdmin,
  updatePaymentEvidenceStatus
);

router.get(
  "/get-all-evidences",
  authenticateUser,
  validateIsAdmin,
  getAllPaymentEvidences
);

module.exports = router;
