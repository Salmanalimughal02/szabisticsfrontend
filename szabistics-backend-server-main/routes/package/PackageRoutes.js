const express = require("express");
const router = express.Router();

const {
  createPackage,
  getAllPackages,
  agreeWithPlatformContract,
  getPackageById,
  completePackage,
  attachLiveLocation,
  sendPackageMessage,
  getConversationByPackageId,
  getDriverContainerWeight,
} = require("../../controllers/package/PackageController");

const {
  createPaymentEvidence,
} = require("../../controllers/paymentEvidence/paymentEvidenceController");

const {
  authenticateUser,
  validateIsOwner,
  validateIsDriver,
} = require("../../middlewares/Auth");

const bidRouter = require("../bid/BidRoutes");
const paymentEvidenceRouter = require("../admin/paymentEvidenceRoutes");
const packageMilestoneRouter = require("./packageMilestoneRoutes");

const {
  SUB_BID,
  PAYMENT_EVIDENCE_SUB,
  MILESTONE_SUB,
} = require("../../constants/Routes");

router.post(
  "/create-package",
  authenticateUser,
  validateIsOwner,
  createPackage
);

router.get("/get-all-packages", authenticateUser, getAllPackages);

router.get("/get-package/:packageId", authenticateUser, getPackageById);

router.patch(
  "/update-agreement-status/:packageId",
  authenticateUser,
  validateIsOwner,
  agreeWithPlatformContract
);

router.post(
  "/complete-package",
  authenticateUser,
  validateIsDriver,
  completePackage
);

router.patch(
  "/attach-live-location/:packageId",
  authenticateUser,
  validateIsDriver,
  attachLiveLocation
);

router.post(
  "/conversation/send-message/:packageId",
  authenticateUser,
  sendPackageMessage
);

router.get(
  "/get-conversation/:packageId",
  authenticateUser,
  getConversationByPackageId
);

router.get(
  "/get-container-weight",
  authenticateUser,
  validateIsDriver,
  getDriverContainerWeight
);

router.use(SUB_BID, bidRouter);
router.use(PAYMENT_EVIDENCE_SUB, paymentEvidenceRouter);
router.use(MILESTONE_SUB, packageMilestoneRouter);

module.exports = router;
