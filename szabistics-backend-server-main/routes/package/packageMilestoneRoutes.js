const express = require("express");
const router = express.Router();

const {
  createMilestoneForPackage,
  getAllMilestonesOfPackage,
} = require("../../controllers/package/packageMilestoneController");

const {
  authenticateUser,
  validateIsOwner,
  validateIsDriver,
} = require("../../middlewares/Auth");

router.post(
  "/create-milestone/:packageId",
  authenticateUser,
  validateIsDriver,
  createMilestoneForPackage
);

router.get(
  "/get-all-milestones/:packageId",
  authenticateUser,
  getAllMilestonesOfPackage
);

module.exports = router;
