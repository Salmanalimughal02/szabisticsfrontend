const express = require("express");
const mainRouter = express.Router();

const {
  USER,
  USER_AUTH,
  USER_RESET_PASSWORD,
  PACKAGE,
  ADMIN,
  PAYMENT_EVIDENCE_MAIN,
  FEEDBACK,
  VERIFICATION,
} = require("./../constants/Routes");

const userAuthRouter = require("./../routes/user/AuthRoutes");
const userRouter = require("./../routes/user/UserRoutes");
const userResetPasswordRouter = require("./../routes/user/ResetPasswordRoutes");
const packageRouter = require("./../routes/package/PackageRoutes");
const adminDriverRouter = require("./../routes/driver/DriverRoutes");
const paymentEvidenceRouter = require("./admin/paymentEvidenceRoutes");
const feedbackRouter = require("./feedback/feedbackRoutes");
const verificationRouter = require("./user/VerificationRoutes");

mainRouter.use(USER_AUTH, userAuthRouter);
mainRouter.use(USER, userRouter);
mainRouter.use(USER_RESET_PASSWORD, userResetPasswordRouter);
mainRouter.use(PACKAGE, packageRouter);
mainRouter.use(ADMIN, adminDriverRouter);
mainRouter.use(PAYMENT_EVIDENCE_MAIN, paymentEvidenceRouter);
mainRouter.use(FEEDBACK, feedbackRouter);
mainRouter.use(VERIFICATION, verificationRouter);

module.exports = mainRouter;
