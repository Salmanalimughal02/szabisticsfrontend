const ERROR_MESSAGES = {
  UNIQUE_EMAIL: "Email address should be unique",
  INVALID_PASSWORD:
    "Password must contain at least 8 characters, including uppercase and lowercase letters",
  EMAIL_REQUIRED: "Email address is required",
  FIRST_NAME_REQUIRED: "First name is required",
  LAST_NAME_REQUIRED: "Last name is required",
  PASSWORD_REQUIRED: "Password is required",
  ROLE_REQUIRED: "Role is required",
  USERNAME_REQUIRED: "Username is required",
  PHONE_NO_REQUIRED: "Phone no is required",
  PRODUCT_TYPE_REQUIRED: "Product type is required",

  PASSWORD_REQUIRED: "Password is required",
  INVALID_JWT: `Invalid token! Please Login Again`,
  EXPIRED_JWT: `Your token has expired! please login again`,
  UNAUTHORIZE: "You are not authorize to perform this action",
  IMAGE_REQUIRED: `Image is required`,
  INVALID_LOGIN_CREDENTIALS: "Email or Password is Incorrect",
  INVALID_EMAIL: `Please Enter Valid Email`,
  NOT_FOUND: "Not Found",
  EMPTY_REQUIRED_FIELDS: "Required fields are empty.",
  INVALID_DATA: "Invalid data received.",
  USER_ALREADY_EXISTS: (userType) => {
    return `${userType} already exists with the provided email address`;
  },
  INVALID_OTP: "Invalid OTP Received!",
  USER_CREDENTIALS_NOT_FOUND: "User not found with provided credentials",
  USER_NOT_FOUND_WITH_EMAIL: "User not found with provided email address",
  USER_NOT_FOUND_WITH_ID: "User not found with provided identification number",

  PACKAGES_NOT_FOUND: "Packages not found",
  PACKAGE_NOT_FOUND: "Package not found",
  PACKAGE_ALREADY_EXISTS: "Package already exists with the provided name",

  BIDS_NOT_FOUND: "Bids not found",
  BID_NOT_FOUND: "Bid not found",
  BID_ALREADY_EXISTS:
    "A bid is already placed that is not accepted nor rejected yet!",

  ENDPOINT_ACCESS_DENIED: (userType) => {
    return `Forbidden! only ${userType}s are allowed.`;
  },
  DRIVER_NOT_FOUND: "Driver not found",

  UNAUTHORIZED_UPDATE_PACKAGE:
    "You're not a authorize seller to update this package",
  UNAUTHORIZED_DELETE_PACKAGE:
    "You're not a authorize seller to delete this package",
  INCORRECT_CURRENT_PASSWORD: "Incorrect current password!",
  UN_APPROVED_ACCOUNT: "Your szabistics account is not approved yet!",
  UN_VERIFIED_ACCOUNT: "Your szabistics account is not verified!",

  PAYMENT_EVIDENCE_ALREADY_EXISTS:
    "Payment evidence has already been submitted for this package and is not approved yet.",

  NO_PAYMENT_EVIDENCES_FOUND: "No payment evidences found.",
  PAYMENT_EVIDENCE_NOT_FOUND: "Payment evidence not found.",
};

const UNAUTHORIZE_MESSAGES = {
  NOT_LOGGED_IN: `You are not logged in please login to get Access`,
  OTP_EXPIRED: "OTP Is Expired.",
  INVALID_JWT: `Invalid token! Please Login Again`,
  EXPIRED_JWT: `Your token has expired! please login again`,
  INVALID_EXPIRED: `Token is invalid or has been Expired`,
  INACTIVE_ACCOUNT:
    "Your account is deactivated, please contact our support team.",
};

module.exports = {
  ERROR_MESSAGES,
  UNAUTHORIZE_MESSAGES,
};
