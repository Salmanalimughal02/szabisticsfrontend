const { bidStatusTypes } = require("../../constants/Basic");
const { ERROR_MESSAGES } = require("../../constants/Errors");
const { ROLES } = require("../../constants/Roles");
const { STATUS_CODE, STATUS_MESSAGES } = require("../../constants/Status");
const { SUCCESS_MESSAGES } = require("../../constants/Success");
const Bid = require("../../models/Bid");
const Package = require("../../models/Package");
const User = require("../../models/User");

const ServerErrorResponse = require("../../utils/classes/ServerErrorResponse");
const ServerSuccessResponse = require("../../utils/classes/ServerSuccessResponse");

const getAllDrivers = async (req, res) => {
  try {
    const currentUser = req.admin;

    var allDriversOrOwners = await User.find({
      role: { $in: [ROLES.DRIVER, ROLES.OWNER] },
    })
      .select("-password")
      .sort({
        createdAt: -1,
      });

    if (!allDriversOrOwners || allDriversOrOwners.length <= 0) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.BIDS_NOT_FOUND));
    }

    return res
      .status(STATUS_CODE.OK)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.OK,
          SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
          allDriversOrOwners
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

const approveOrUnapproveDriver = async (req, res) => {
  try {
    const driverId = req.params.driverId;

    var { isActive, isApproved } = req.body;

    const driver = await User.findById(driverId);

    if (!driver) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(
          ServerErrorResponse.notFound(ERROR_MESSAGES.USER_NOT_FOUND_WITH_ID)
        );
    }

    const filter = {
      _id: driver._id,
    };

    const updatedData = {
      isActive,
      isApproved,
    };

    const updatedUser = await User.findByIdAndUpdate(filter, updatedData, {
      new: true,
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.OK,
          SUCCESS_MESSAGES.UPDATE,
          updatedUser
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

const getDriveById = async (req, res) => {
  try {
    const currentUser = req.user;
    const driverId = req.params.driverId;

    var driver = await User.findById(driverId).select("-password");
    if (!driver) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.DRIVER_NOT_FOUND));
    }

    return res
      .status(STATUS_CODE.OK)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.OK,
          SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
          driver
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
  getAllDrivers,
  approveOrUnapproveDriver,
  getDriveById,
};
