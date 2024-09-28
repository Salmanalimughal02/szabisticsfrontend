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

const createBidForPackage = async (req, res) => {
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

    const packageExists = await Package.findById(packageId);

    if (!packageExists) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.PACKAGE_NOT_FOUND));
    }

    const bidExists = await Bid.findOne({
      user: currentUser._id,
      status: bidStatusTypes.PLACED,
    });

    if (bidExists) {
      return res
        .status(STATUS_CODE.CONFLICT)
        .json(
          ServerErrorResponse.customError(
            STATUS_MESSAGES.CONFLICT,
            STATUS_CODE.CONFLICT,
            ERROR_MESSAGES.BID_ALREADY_EXISTS,
            null
          )
        );
    }

    const { bidFare, notesOrInstruction } = req.body;

    const bid = new Bid({
      bidFare,
      notesOrInstruction,
      status: bidStatusTypes.PLACED,
      user: currentUser._id,
      package: packageExists._id,
    });

    const savedBid = await bid.save();

    await Package.findByIdAndUpdate(
      { _id: packageExists._id },
      {
        $push: { offers: savedBid._id },
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
          savedBid
        )
      );
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json(ServerErrorResponse.internal(error));
  }
};

const getAllBidsByPackageId = async (req, res) => {
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

    // const query =
    //   currentUser.role === ROLES.OWNER
    //     ? { package: packageExists._id }
    //     : { package: packageExists._id, user: currentUser._id };

    const query = { package: packageExists._id };

    var allBidsOfPackage = await Bid.find(query)
      .populate(
        "user",
        "firstName lastName profileImage _id phoneNo emailAddress"
      )
      .sort({
        createdAt: -1,
      });

    if (!allBidsOfPackage || allBidsOfPackage.length <= 0) {
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
          allBidsOfPackage
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

const acceptOrRejectBid = async (req, res) => {
  try {
    const packageId = req.body.packageId;
    const bidId = req.body.bidId;
    const driverId = req.body.driverId;

    const currentUser = req.owner;

    if (
      !packageId ||
      packageId === "" ||
      !bidId ||
      bidId === "" ||
      !driverId ||
      driverId === ""
    ) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(
          ServerErrorResponse.badRequest(ERROR_MESSAGES.EMPTY_REQUIRED_FIELDS)
        );
    }

    const package = await Package.findById(packageId);
    if (!package) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.PACKAGE_NOT_FOUND));
    }

    const bidInstance = await Bid.findById(bidId);
    if (!bidInstance) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.BID_NOT_FOUND));
    }

    const driverInstance = await User.findById(driverId);
    if (!driverInstance) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.DRIVER_NOT_FOUND));
    }

    const { status } = req.body;

    const filter = {
      _id: bidInstance._id,
    };

    const updatedData = {
      status,
    };

    const updatedBid = await Bid.findByIdAndUpdate(filter, updatedData, {
      new: true,
    });

    if (status === bidStatusTypes.ACCEPTED) {
      const filterPackage = {
        _id: package._id,
      };

      const updatedDataPackage = {
        acceptedOffer: bidInstance._id,
        OfferAcceptionTimestamp: new Date(Date.now() + 6 * 60 * 60 * 1000),
        driver: driverInstance._id,
        status: "In Progress",
        message: "driver bid accepted",
      };

      const updatedPackage = await Package.findByIdAndUpdate(
        filterPackage,
        updatedDataPackage,
        {
          new: true,
        }
      );

      await Bid.updateMany(
        {
          _id: { $ne: bidInstance._id },
          package: package._id,
          status: bidStatusTypes.PLACED,
        },
        { status: bidStatusTypes.REJECTED }
      );
    } else if (status === bidStatusTypes.REJECTED) {
      await Package.findByIdAndUpdate(
        { _id: package._id },
        {
          message: "driver bid rejected",
        },
        {
          new: true,
        }
      );
    }

    return res
      .status(STATUS_CODE.OK)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.OK,
          status === bidStatusTypes.ACCEPTED
            ? SUCCESS_MESSAGES.BID_ACCEPTED
            : SUCCESS_MESSAGES.BID_REJECTED,
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

module.exports = {
  createBidForPackage,
  getAllBidsByPackageId,
  acceptOrRejectBid,
};
