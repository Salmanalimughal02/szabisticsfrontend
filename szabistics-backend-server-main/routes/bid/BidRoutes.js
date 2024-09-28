const express = require("express");
const router = express.Router();

const {
  createBidForPackage,
  getAllBidsByPackageId,
  acceptOrRejectBid,
} = require("../../controllers/bid/BidController");

const {
  authenticateUser,
  validateIsOwner,
  validateIsDriver,
} = require("../../middlewares/Auth");

router.post(
  "/create-bid/:packageId",
  authenticateUser,
  validateIsDriver,
  createBidForPackage
);

router.get("/get-all-bids/:packageId", authenticateUser, getAllBidsByPackageId);

router.post(
  "/accept-or-reject-bid",
  authenticateUser,
  validateIsOwner,
  acceptOrRejectBid
);

module.exports = router;
