const {
  bidStatusTypes,
  paymentStatusTypes,
  folderNames,
} = require("../../constants/Basic");
const { ERROR_MESSAGES } = require("../../constants/Errors");
const { ROLES } = require("../../constants/Roles");
const { STATUS_CODE, STATUS_MESSAGES } = require("../../constants/Status");
const { SUCCESS_MESSAGES } = require("../../constants/Success");
const PaymentEvidence = require("../../models/PaymentEvidence");
const Package = require("../../models/Package");
const ServerErrorResponse = require("../../utils/classes/ServerErrorResponse");
const ServerSuccessResponse = require("../../utils/classes/ServerSuccessResponse");
const { uploadImageToCloudinary } = require("../../utils/Cloudinary");
const {
  sendPaymentApprovalEmail,
  sendPackageInitiationEmail,
} = require("../../utils/Email");

const createPaymentEvidence = async (req, res) => {
  try {
    const currentUser = req.owner;
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

    const paymentEvidenceExists = await PaymentEvidence.findOne({
      user: currentUser._id,
      package: packageExists._id,
      status: paymentStatusTypes.UPLOADED,
    });

    if (paymentEvidenceExists) {
      return res
        .status(STATUS_CODE.CONFLICT)
        .json(
          ServerErrorResponse.customError(
            STATUS_MESSAGES.CONFLICT,
            STATUS_CODE.CONFLICT,
            ERROR_MESSAGES.PAYMENT_EVIDENCE_ALREADY_EXISTS,
            null
          )
        );
    }

    const { transactionId, evidenceAttachmentBase64 } = req.body;
    var uploadedImage = null;

    if (evidenceAttachmentBase64) {
      uploadedImage = await uploadImageToCloudinary(
        evidenceAttachmentBase64,
        folderNames.PAYMENT_EVIDENCES
      );
    }

    const paymentEvidence = new PaymentEvidence({
      transactionId,
      evidenceAttachment: {
        url: uploadedImage ? uploadedImage.secure_url : "",
        publicId: uploadedImage ? uploadedImage.public_id : "",
      },
      status: paymentStatusTypes.UPLOADED,
      user: currentUser._id,
      package: packageExists._id,
    });

    const savedPaymentEvidence = await paymentEvidence.save();

    await Package.findByIdAndUpdate(
      packageExists._id,
      {
        paymentEvidence: savedPaymentEvidence._id,
        message: "Payment approval pending",
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
          savedPaymentEvidence
        )
      );
  } catch (error) {
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json(ServerErrorResponse.internal(error));
  }
};

const getAllPaymentEvidences = async (req, res) => {
  try {
    const paymentEvidences = await PaymentEvidence.find({})
      .populate(
        "user",
        "_id firstName lastName profileImage emailAddress phoneNo"
      )
      .populate({
        path: "package",
        populate: {
          path: "driver",
          select: "_id firstName lastName profileImage emailAddress phoneNo",
        },
      })
      .sort({
        createdAt: -1,
      });

    if (!paymentEvidences || paymentEvidences.length <= 0) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(
          ServerErrorResponse.notFound(
            ERROR_MESSAGES.NO_PAYMENT_EVIDENCES_FOUND
          )
        );
    }

    return res
      .status(STATUS_CODE.OK)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.OK,
          SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
          paymentEvidences
        )
      );
  } catch (error) {
    return res
      .status(STATUS_CODE.SERVER_ERROR)
      .json(ServerErrorResponse.internal(error));
  }
};

const updatePaymentEvidenceStatus = async (req, res) => {
  try {
    const { paymentEvidenceId } = req.params;
    const { status } = req.body;

    if (!paymentEvidenceId || !status) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(
          ServerErrorResponse.badRequest(ERROR_MESSAGES.EMPTY_REQUIRED_FIELDS)
        );
    }

    const paymentEvidence = await PaymentEvidence.findById(paymentEvidenceId);

    if (!paymentEvidence) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(
          ServerErrorResponse.notFound(
            ERROR_MESSAGES.PAYMENT_EVIDENCE_NOT_FOUND
          )
        );
    }

    paymentEvidence.status = status;

    const updatedPaymentEvidence = await paymentEvidence.save();

    if (status === paymentStatusTypes.APPROVED) {
      const packageExists = await Package.findById(paymentEvidence.package)
        .populate("user")
        .populate("driver");

      await Package.findByIdAndUpdate(
        { _id: packageExists._id },
        {
          message: "Payment evidence approved",
        },
        {
          new: true,
        }
      );

      if (packageExists.user) {
        await sendPaymentApprovalEmail(
          packageExists.user.emailAddress,
          packageExists.name
        );
      }

      if (packageExists.driver) {
        await sendPackageInitiationEmail(
          packageExists.driver.emailAddress,
          packageExists.name
        );
      }
    } else {
      await Package.findByIdAndUpdate(
        { _id: packageExists._id },
        {
          message: "Payment evidence rejected",
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
          SUCCESS_MESSAGES.UPDATE,
          updatedPaymentEvidence
        )
      );
  } catch (error) {
    return res
      .status(STATUS_CODE.SERVER_ERROR)
      .json(ServerErrorResponse.internal(error));
  }
};

module.exports = {
  createPaymentEvidence,
  getAllPaymentEvidences,
  updatePaymentEvidenceStatus,
};
