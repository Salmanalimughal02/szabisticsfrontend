const SUCCESS_MESSAGES = {
  CREATED: "Created Successfully",
  UPDATE: "Updated Successfully",
  DELETE: "Deleted Successfully",
  OPERATION_SUCCESSFULL: "Operation Successful",
  UPLOADED: "File uploaded successfully!",
  LOGIN_SUCCESSFUL: "Credentials match, login successful.",
  OTP_SENT_SUCCESS: "OTP Sent Successfully.",
  PREVIOUS_OTP_NOT_EXPIRED: "A previous OTP exists and is not expired yet.",
  CORRECT_CURRENT_PASSWORD: "Current password matched!",
  MESSAGE_SENT: "Message Sent Successfully.",
  BID_ACCEPTED: "Bid Accepted Successfully",
  BID_REJECTED: "Bid Rejected Successfully",
  AGREED_WITH_CONTRACT: (agreed) => {
    return `You are ${
      !agreed ? "not " : ""
    }agreed with the szabistics contract ${
      !agreed ? "." : "and banking details are sent on your email."
    }`;
  },
};

module.exports = {
  SUCCESS_MESSAGES,
};
