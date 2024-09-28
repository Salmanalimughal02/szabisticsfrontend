const mongoose = require("mongoose");

const { roles } = require("../constants/Basic");
const { ERROR_MESSAGES } = require("../constants/Errors");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, ERROR_MESSAGES.USERNAME_REQUIRED],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, ERROR_MESSAGES.FIRST_NAME_REQUIRED],
      default: "",
    },
    lastName: {
      type: String,
      required: [true, ERROR_MESSAGES.LAST_NAME_REQUIRED],
      default: "",
    },
    emailAddress: {
      type: String,
      required: [true, ERROR_MESSAGES.EMAIL_REQUIRED],
      unique: [true, ERROR_MESSAGES.UNIQUE_EMAIL],
      default: "",
    },
    phoneNo: {
      type: String,
      required: [true, ERROR_MESSAGES.PHONE_NO_REQUIRED],
      default: "",
    },
    password: {
      type: String,
      required: [true, ERROR_MESSAGES.PASSWORD_REQUIRED],
      default: "",
    },

    profileImage: {
      url: {
        type: String,
        required: false,
        default: "",
      },
      public_id: {
        type: String,
        required: false,
        default: "",
      },
      isUploaded: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    cnicImage: {
      url: {
        type: String,
        required: false,
        default: "",
      },
      public_id: {
        type: String,
        required: false,
        default: "",
      },
      isUploaded: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    role: {
      type: String,
      required: [true, ERROR_MESSAGES.ROLE_REQUIRED],
      enum: {
        values: roles,
        message: "Role must be DRIVER or OWNER!",
      },
    },

    isApproved: {
      type: Boolean,
      required: false,
      default: true,
    },

    isVerified: {
      type: Boolean,
      required: false,
      default: false,
    },

    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
    country: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
