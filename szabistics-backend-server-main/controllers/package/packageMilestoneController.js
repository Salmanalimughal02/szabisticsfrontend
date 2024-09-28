const { bidStatusTypes } = require("../../constants/Basic");
const { ERROR_MESSAGES } = require("../../constants/Errors");
const { ROLES } = require("../../constants/Roles");
const { STATUS_CODE, STATUS_MESSAGES } = require("../../constants/Status");
const { SUCCESS_MESSAGES } = require("../../constants/Success");
const Bid = require("../../models/Bid");
const Package = require("../../models/Package");
const User = require("../../models/User");
const PackageUpdate = require("../../models/PackageUpdate");

const ServerErrorResponse = require("../../utils/classes/ServerErrorResponse");
const ServerSuccessResponse = require("../../utils/classes/ServerSuccessResponse");
const { sendPackageLocationUpdateEmail } = require("../../utils/Email");

const createMilestoneForPackage = async (req, res) => {
  try {
    const currentUser = req.driver;

    const packageId = req.params.packageId;

    if (!packageId || packageId === "") {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(
          ServerErrorResponse.badRequest(ERROR_MESSAGES.EMPTY_REQUIRED_FIELDS)
        );
    }

    const packageExists = await Package.findById(packageId).populate("user");

    if (!packageExists) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.PACKAGE_NOT_FOUND));
    }

    const { location, title, url } = req.body;

    const packageUpdate = new PackageUpdate({
      title,
      location,
      url,
      user: currentUser._id,
      package: packageExists._id,
    });

    const savedPackageUpdate = await packageUpdate.save();

    await Package.findByIdAndUpdate(
      { _id: packageExists._id },
      {
        message: "New milestone added",
        $push: { milestones: savedPackageUpdate._id },
      },
      {
        new: true,
      }
    );

    await sendPackageLocationUpdateEmail(
      packageExists.user.emailAddress,
      packageExists.name,
      savedPackageUpdate.location,
      savedPackageUpdate.title,
      savedPackageUpdate.url,
      savedPackageUpdate.createdAt
    );

    return res
      .status(STATUS_CODE.CREATED)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.CREATED,
          SUCCESS_MESSAGES.CREATED,
          savedPackageUpdate
        )
      );
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json(ServerErrorResponse.internal(error));
  }
};

const getAllMilestonesOfPackage = async (req, res) => {
  try {
    const currentUser = req.user;

    const packageId = req.params.packageId;

    if (!packageId || packageId === "") {
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

    const query =
      currentUser.role === ROLES.OWNER
        ? { package: packageExists._id }
        : { package: packageExists._id, user: currentUser._id };

    var allMilestonesOfPackage = await PackageUpdate.find({
      package: packageExists._id,
    }).populate(
      "user",
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
          allMilestonesOfPackage
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
  createMilestoneForPackage,
  getAllMilestonesOfPackage,
};
