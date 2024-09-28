const User = require("../../models/User");

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

const loginUser = async (req, res) => {
  try {
    const { emailAddress, password } = req.body;

    const requiredFields = ["emailAddress", "password"];

    if (requiredFields.some((field) => !req.body[field])) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(
          ServerErrorResponse.badRequest(ERROR_MESSAGES.EMPTY_REQUIRED_FIELDS)
        );
    }

    var isValidEmail = regex.email.test(emailAddress);

    if (!isValidEmail) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(ServerErrorResponse.badRequest(ERROR_MESSAGES.INVALID_EMAIL));
    }

    const user = await User.findOne({
      emailAddress: emailAddress,
    });

    if (!user) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json(
          ServerErrorResponse.customError(
            STATUS_MESSAGES.FAILED,
            STATUS_CODE.NOT_FOUND,
            ERROR_MESSAGES.USER_CREDENTIALS_NOT_FOUND,
            null
          )
        );
    }

    if (!user.isApproved && !user.isActive) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json(
          ServerErrorResponse.customError(
            STATUS_MESSAGES.ERROR,
            STATUS_CODE.UNAUTHORIZED,
            ERROR_MESSAGES.UN_APPROVED_ACCOUNT,
            null
          )
        );
    }

    if (!user.isActive) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json(
          ServerErrorResponse.customError(
            STATUS_MESSAGES.ERROR,
            STATUS_CODE.UNAUTHORIZED,
            UNAUTHORIZE_MESSAGES.INACTIVE_ACCOUNT,
            null
          )
        );
    }

    if (!user.isApproved) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json(
          ServerErrorResponse.customError(
            STATUS_MESSAGES.ERROR,
            STATUS_CODE.UNAUTHORIZED,
            ERROR_MESSAGES.UN_APPROVED_ACCOUNT,
            null
          )
        );
    }

    if (!user.isVerified) {
      return res.status(STATUS_CODE.UNAUTHORIZED).json(
        ServerErrorResponse.customError(
          STATUS_MESSAGES.ERROR,
          STATUS_CODE.UNAUTHORIZED,
          ERROR_MESSAGES.UN_VERIFIED_ACCOUNT,
          {
            isVerified: user.isVerified,
          }
        )
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json(
          ServerErrorResponse.customError(
            STATUS_MESSAGES.FAILED,
            STATUS_CODE.UNAUTHORIZED,
            ERROR_MESSAGES.INVALID_LOGIN_CREDENTIALS,
            null
          )
        );
    }

    var tokenPayload = {
      userId: user._id,
      role: user.role,
    };

    const authToken = await generateAuthenticationToken(tokenPayload);
    user.password = null;
    var responseData = {
      user: user,
      authToken: authToken,
    };

    return res
      .status(STATUS_CODE.OK)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_MESSAGES.SUCCESS,
          STATUS_CODE.OK,
          SUCCESS_MESSAGES.LOGIN_SUCCESSFUL,
          responseData
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

const registerUser = async (req, res) => {
  try {
    const requiredFields = [
      "emailAddress",
      "password",
      "firstName",
      "lastName",
      "role",
      "phoneNo",
    ];

    if (requiredFields.some((field) => !req.body[field])) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(
          ServerErrorResponse.badRequest(ERROR_MESSAGES.EMPTY_REQUIRED_FIELDS)
        );
    }

    const {
      emailAddress,
      password,
      firstName,
      lastName,
      role,
      phoneNo,
      isCnicImageSelected,
      cnicImageBase64,
      country,
    } = req.body;

    const userExists = await User.findOne({
      emailAddress: emailAddress,
    });

    if (userExists) {
      return res
        .status(STATUS_CODE.CONFLICT)
        .json(
          ServerErrorResponse.customError(
            STATUS_MESSAGES.CONFLICT,
            STATUS_CODE.CONFLICT,
            ERROR_MESSAGES.USER_ALREADY_EXISTS("User"),
            null
          )
        );
    }

    if (role === ROLES.DRIVER && isCnicImageSelected) {
      const cloudinaryResult = await uploadImageToCloudinary(
        cnicImageBase64,
        folderNames.CNIC
      );

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const generatedUserName = generateRandomUsername();
      const user = new User({
        username: generatedUserName,
        emailAddress,
        role,
        firstName,
        lastName,
        phoneNo,
        password: hashedPassword,

        cnicImage: {
          url: cloudinaryResult.secure_url,
          public_id: cloudinaryResult.public_id,
          isUploaded: true,
        },
        isActive: role === ROLES.DRIVER ? false : true,
        isApproved: role === ROLES.DRIVER ? false : true,
        isVerified: false,
        country: country ? country : "",
      });

      const savedUser = await user.save();

      return res
        .status(STATUS_CODE.CREATED)
        .json(
          ServerSuccessResponse.successResponse(
            true,
            STATUS_MESSAGES.SUCCESS,
            STATUS_CODE.CREATED,
            SUCCESS_MESSAGES.CREATED,
            savedUser
          )
        );
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const generatedUserName = generateRandomUsername();
      const user = new User({
        username: generatedUserName,
        emailAddress,
        role,
        firstName,
        lastName,
        phoneNo,
        password: hashedPassword,
        profileImage: {
          url: "",
          public_id: "",
          isUploaded: false,
        },
        cnicImage: {
          url: "",
          public_id: "",
          isUploaded: false,
        },

        isActive: true,
        isVerified: false,
        country: country ? country : "",
      });

      const savedUser = await user.save();

      return res
        .status(STATUS_CODE.CREATED)
        .json(
          ServerSuccessResponse.successResponse(
            true,
            STATUS_MESSAGES.SUCCESS,
            STATUS_CODE.CREATED,
            SUCCESS_MESSAGES.CREATED,
            savedUser
          )
        );
    }
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

module.exports = {
  loginUser,
  registerUser,
};
