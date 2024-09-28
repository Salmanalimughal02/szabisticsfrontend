const { bidStatusTypes } = require("../../constants/Basic");
const { ERROR_MESSAGES } = require("../../constants/Errors");
const { ROLES } = require("../../constants/Roles");
const { STATUS_CODE, STATUS_MESSAGES } = require("../../constants/Status");
const { SUCCESS_MESSAGES } = require("../../constants/Success");
const Bid = require("../../models/Bid");
const Package = require("../../models/Package");
const User = require("../../models/User");
const PackageUpdate = require("../../models/PackageUpdate");
const Feeback = require("../../models/Feeback");

const ServerErrorResponse = require("../../utils/classes/ServerErrorResponse");
const ServerSuccessResponse = require("../../utils/classes/ServerSuccessResponse");

const submitFeedback = async (req, res) => {
  try {
    const currentUser = req.owner;

    const driverId = req.body.driverId;
    const packageId = req.body.packageId;

    if (!driverId || driverId === "") {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(
          ServerErrorResponse.badRequest(ERROR_MESSAGES.EMPTY_REQUIRED_FIELDS)
        );
    }

    const packageExists = await Package.findById(packageId);

    if (!packageExists) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.PACKAGE_NOT_FOUND));
    }

    const driverExists = await User.findById(driverId);

    if (!driverExists) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.DRIVER_NOT_FOUND));
    }

    const { rating, review } = req.body;

    const packageFeeback = new Feeback({
      driver: driverExists._id,
      rating,
      review,
      user: currentUser._id,
    });

    const savedFeeback = await packageFeeback.save();

    await Package.findByIdAndUpdate(
      packageExists._id,
      {
        feedBack: savedFeeback._id,
      },
      {
        new: true,
      }
    );

    return res
      .status(STATUS_CODE.CREATED)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.CREATED,
          SUCCESS_MESSAGES.CREATED,
          savedFeeback
        )
      );
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json(ServerErrorResponse.internal(error));
  }
};

const getAllFeebacks = async (req, res) => {
  try {
    const currentUser = req.user;

    const driverId = req.params.driverId;

    if (!driverId || driverId === "") {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(
          ServerErrorResponse.badRequest(ERROR_MESSAGES.EMPTY_REQUIRED_FIELDS)
        );
    }

    const driverExists = await User.findById(driverId);

    if (!driverExists) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.DRIVER_NOT_FOUND));
    }

    var allFeebacks = await Feeback.find({
      driver: driverExists._id,
    })
      .populate(
        "user",
        "firstName lastName profileImage _id phoneNo emailAddress"
      )
      .populate(
        "driver",
        "firstName lastName profileImage _id phoneNo emailAddress"
      );

    return res
      .status(STATUS_CODE.OK)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.OK,
          SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
          allFeebacks
        )
      );
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json(
        ServerErrorResponse.customErrorWithStackTrace(
          STATUS_CODE.SERVER_ERROR,
          STATUS_MESSAGES.SERVER_ERROR,
          error
        )
      );
  }
};

module.exports = {
  submitFeedback,
  getAllFeebacks,
};
