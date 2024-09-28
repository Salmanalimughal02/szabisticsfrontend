const express = require("express");
const router = express.Router();

const {
  approveOrUnapproveDriver,
  getAllDrivers,
  getDriveById,
} = require("../../controllers/driver/DriverController");

const {
  authenticateUser,
  validateIsOwner,
  validateIsDriver,
  validateIsAdmin,
} = require("../../middlewares/Auth");

router.patch(
  "/approve-or-unapprove/:driverId",
  authenticateUser,
  validateIsAdmin,
  approveOrUnapproveDriver
);

router.get(
  "/get-all-drivers",
  authenticateUser,
  validateIsAdmin,
  getAllDrivers
);

router.get("/get-driver/:driverId", authenticateUser, getDriveById);

module.exports = router;
