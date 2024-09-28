const User = require("../../models/User");
const Package = require("../../models/Package");
const PackageUpdate = require("../../models/PackageUpdate");

const { STATUS_CODE, STATUS_MESSAGES } = require("../../constants/Status");
const {
  ERROR_MESSAGES,
  UNAUTHORIZE_MESSAGES,
} = require("../../constants/Errors");
const { ROLES } = require("../../constants/Roles");
const { regex } = require("../../utils/Regex");
const bcrypt = require("bcrypt");
const { SUCCESS_MESSAGES } = require("../../constants/Success");
const { generateAuthenticationToken } = require("../../utils/JwtManagement");
const { generateRandomUsername } = require("../../utils/Basic");
const {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} = require("../../utils/Cloudinary");

const ServerErrorResponse = require("../../utils/classes/ServerErrorResponse");
const ServerSuccessResponse = require("../../utils/classes/ServerSuccessResponse");
const { folderNames } = require("../../constants/Basic");
const {
  sendBankingDetailsEmail,
  sendConversationUpdateEmail,
} = require("../../utils/Email");
const packageMessageModel = require("../../models/Message");

const createPackage = async (req, res) => {
  try {
    const currentUser = req.owner;

    const requiredFields = ["name", "modelNo", "dimensions"];

    if (requiredFields.some((field) => !req.body[field])) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(
          ServerErrorResponse.badRequest(ERROR_MESSAGES.EMPTY_REQUIRED_FIELDS)
        );
    }

    const {
      name,
      modelNo,
      dimensions,
      packageImageBase64,
      location,
      instructionsOrNotes,
      isLoadingDockAvailable,
      releaseDocument2Base64,
      releaseDocument1Base64,
      category,
      distance,
    } = req.body;

    const packageExists = await Package.findOne({
      name: name,
    });

    if (packageExists) {
      return res
        .status(STATUS_CODE.CONFLICT)
        .json(
          ServerErrorResponse.customError(
            STATUS_MESSAGES.CONFLICT,
            STATUS_CODE.CONFLICT,
            ERROR_MESSAGES.PACKAGE_ALREADY_EXISTS,
            null
          )
        );
    }

    const cloudinaryResult = await uploadImageToCloudinary(
      packageImageBase64,
      folderNames.PACKAGE
    );

    const cloudinaryResult_v2 = await uploadImageToCloudinary(
      releaseDocument1Base64,
      folderNames.PACKAGE
    );

    const cloudinaryResult_v3 = await uploadImageToCloudinary(
      releaseDocument2Base64,
      folderNames.PACKAGE
    );

    const package = new Package({
      name,
      modelNo,
      dimensions,
      instructionsOrNotes,
      isLoadingDockAvailable,
      location,
      user: currentUser._id,

      packagePic: {
        url: cloudinaryResult.secure_url,
        public_id: cloudinaryResult.public_id,
        isUploaded: true,
      },

      releaseDocument1: {
        url: cloudinaryResult_v2.secure_url,
        public_id: cloudinaryResult_v2.public_id,
        isUploaded: true,
      },

      releaseDocument2: {
        url: cloudinaryResult_v3.secure_url,
        public_id: cloudinaryResult_v3.public_id,
        isUploaded: true,
      },
      isActive: true,
      category,
      distance,
    });

    const savedPackage = await package.save();

    return res
      .status(STATUS_CODE.CREATED)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.CREATED,
          SUCCESS_MESSAGES.CREATED,
          savedPackage
        )
      );
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json(
        ServerErrorResponse.customErrorWithStackTrace(
          STATUS_CODE.SERVER_ERROR,
          STATUS_MESSAGES.SOMETHING_WENT_WRONG,
          error
        )
      );
  }
};

const getAllPackages = async (req, res) => {
  try {
    const currentUser = req.user;

    const query =
      currentUser.role === ROLES.OWNER ? { user: currentUser._id } : {};

    var allPackages = await Package.find(query)
      .populate(
        "user",
        "firstName lastName profileImage _id phoneNo emailAddress"
      )

      .populate(["acceptedOffer", "paymentEvidence", "offers", "feedBack"])
      .sort({
        createdAt: -1,
      });

    if (!allPackages || allPackages.length <= 0) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.PACKAGES_NOT_FOUND));
    }

    return res
      .status(STATUS_CODE.OK)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.OK,
          SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
          allPackages
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

const agreeWithPlatformContract = async (req, res) => {
  try {
    const currentUser = req.owner;

    const { packageId } = req.params;

    const { hasUserAgreedWithContract } = req.body;

    const packageExists = await Package.findOne({
      user: currentUser._id,
      _id: packageId,
    });

    if (!packageExists) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.PACKAGE_NOT_FOUND));
    }

    const filter = {
      _id: packageExists._id,
    };

    const updatedData = {
      hasUserAgreedWithContract,
    };

    const updatedPackage = await Package.findByIdAndUpdate(
      filter,
      updatedData,
      {
        new: true,
      }
    );

    if (hasUserAgreedWithContract) {
      await sendBankingDetailsEmail(currentUser.emailAddress);
    }

    return res
      .status(STATUS_CODE.OK)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.OK,
          SUCCESS_MESSAGES.AGREED_WITH_CONTRACT(hasUserAgreedWithContract),
          updatedPackage
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

const getPackageById = async (req, res) => {
  try {
    const currentUser = req.user;
    const packageId = req.params.packageId;

    const packageExists = await Package.findById(packageId)
      .populate(
        "user",
        "firstName lastName profileImage _id phoneNo emailAddress"
      )
      .populate(
        "driver",
        "firstName lastName profileImage _id phoneNo emailAddress"
      )
      .populate({
        path: "feedBack",
        populate: {
          path: "user",
          select: "firstName lastName profileImage _id phoneNo emailAddress",
        },
      })

      .populate({
        path: "feedBack",
        populate: {
          path: "driver",
          select: "firstName lastName profileImage _id phoneNo emailAddress",
        },
      })
      .populate({
        path: "conversation",
        populate: {
          path: "user",
          select: "firstName lastName profileImage _id phoneNo emailAddress",
        },
      })

      .populate(["acceptedOffer", "paymentEvidence", "offers"]);

    if (!packageExists) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.PACKAGE_NOT_FOUND));
    }

    return res
      .status(STATUS_CODE.OK)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.OK,
          SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
          packageExists
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

const completePackage = async (req, res) => {
  try {
    const currentUser = req.driver;

    const { packageId } = req.body;

    const { location, url } = req.body;

    const packageExists = await Package.findById(packageId);

    if (!packageExists) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.PACKAGE_NOT_FOUND));
    }

    const filter = {
      _id: packageExists._id,
    };

    const updatedData = {
      isCompleted: true,
    };

    const updatedPackage = await Package.findByIdAndUpdate(
      filter,
      updatedData,
      {
        new: true,
      }
    );

    const packageUpdate = new PackageUpdate({
      title: "Completed",
      location,
      url,
      user: currentUser._id,
      package: packageExists._id,
    });

    const savedPackageUpdate = await packageUpdate.save();

    await Package.findByIdAndUpdate(
      { _id: packageExists._id },
      {
        message: "Package delivered",
        status: "Completed",
      },
      {
        new: true,
      }
    );

    return res
      .status(STATUS_CODE.OK)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.OK,
          SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
          updatedPackage
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

const attachLiveLocation = async (req, res) => {
  try {
    const currentUser = req.driver;

    const { packageId } = req.params;

    const { liveLocationUrl } = req.body;

    const packageExists = await Package.findById(packageId);

    if (!packageExists) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.PACKAGE_NOT_FOUND));
    }

    const filter = {
      _id: packageExists._id,
    };

    const updatedData = {
      liveLocationUrl,
      message: "Live location URL added",
    };

    const updatedPackage = await Package.findByIdAndUpdate(
      filter,
      updatedData,
      {
        new: true,
      }
    );

    return res
      .status(STATUS_CODE.OK)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.OK,
          SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
          updatedPackage
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

const sendPackageMessage = async (req, res) => {
  try {
    const packageId = req.params.packageId;

    const currentUser = req.user;

    const { message } = req.body;

    if (!packageId || packageId == "" || !message || message == "") {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(
          ServerErrorResponse.badRequest(ERROR_MESSAGES.EMPTY_REQUIRED_FIELDS)
        );
    }

    const packageExists = await Package.findById(packageId)
      .populate("user")
      .populate("driver");

    if (!packageExists) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.PACKAGE_NOT_FOUND));
    }

    const newPackageMessage = new packageMessageModel({
      messageText: message,
      user: currentUser._id,
      package: packageExists._id,
    });

    const newSavedPackageMessage = await newPackageMessage.save();

    const filter = {
      _id: packageExists._id,
    };

    const updatedData = {
      message: "New message",
      $push: {
        conversation: newSavedPackageMessage._id,
      },
    };

    const updatedPackage = await Package.findByIdAndUpdate(
      filter,
      updatedData,
      {
        new: true,
      }
    );

    if (currentUser.role === ROLES.DRIVER) {
      await sendConversationUpdateEmail(
        packageExists.user.emailAddress,
        packageExists.name,
        newSavedPackageMessage.createdAt
      );
    } else if (currentUser.role === ROLES.OWNER) {
      await sendConversationUpdateEmail(
        packageExists.driver.emailAddress,
        packageExists.name,
        newSavedPackageMessage.createdAt
      );
    }

    return res
      .status(STATUS_CODE.OK)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.OK,
          SUCCESS_MESSAGES.MESSAGE_SENT,
          null
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

const getConversationByPackageId = async (req, res) => {
  try {
    const currentUser = req.user;
    const packageId = req.params.packageId;

    const packageExists = await Package.findById(packageId);

    if (!packageExists) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.PACKAGE_NOT_FOUND));
    }

    const conversationMessages = await packageMessageModel
      .find({
        package: packageExists._id,
      })
      .populate(
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
          conversationMessages
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

const getDriverContainerWeight = async (req, res) => {
  try {
    const currentUser = req.driver;

    const packagesExists = await Package.find({
      driver: currentUser._id,
    });

    if (!packagesExists || packagesExists.length <= 0) {
      return res.status(STATUS_CODE.OK).json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.OK,
          SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,

          {
            totalWeight: 0,
          }
        )
      );
    }

    let totalWeight = 0;

    packagesExists.forEach((element) => {
      console.log("element.dimensions.weight: ", element.dimensions.weight);
      totalWeight += Number(element.dimensions.weight);
    });
    return res
      .status(STATUS_CODE.OK)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.OK,
          SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
          { totalWeight: totalWeight }
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
  createPackage,
  getAllPackages,
  agreeWithPlatformContract,
  getPackageById,
  completePackage,
  sendPackageMessage,
  attachLiveLocation,
  getConversationByPackageId,
  getDriverContainerWeight,
};
