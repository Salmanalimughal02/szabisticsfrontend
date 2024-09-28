export const API_BASE_URL = "http://localhost:8080/api/v1";

// User / Auth

export const REGISTER = `${API_BASE_URL}/auth/user/register-user`;
export const LOGIN = `${API_BASE_URL}/auth/user/login`;

// User / Reset Password

export const VALIDATE_CURRENT_PASSWORD = `${API_BASE_URL}/user/reset-password/validate-current-password`;
export const UPDATE_PASSWORD = `${API_BASE_URL}/user/reset-password/update-password`;

// User / Profile

export const GET_PROFILE = `${API_BASE_URL}/user/get-profile`;
export const UPDATE_PROFILE_IMAGE = `${API_BASE_URL}/user/update-profile-image`;
export const UPDATE_PROFILE = `${API_BASE_URL}/user/update-profile`;

// User / Forgot Password

export const CHECK_USER_EMAIL = `${API_BASE_URL}/auth/user/check-user-email`;
export const SEND_OTP_EMAIL = `${API_BASE_URL}/auth/user/send-otp-email`;
export const VERIFY_OTP = `${API_BASE_URL}/auth/user/verify-otp`;
export const RESET_PASSWORD = `${API_BASE_URL}/auth/user/reset-password`;

export const SEND_VERIFICATION_OTP = `${API_BASE_URL}/verification/send-verification-email-otp`;
export const VERIFY_REGISTRATION_OTP = `${API_BASE_URL}/verification/verify-registration-verification-otp`;

// Package

export const CREATE_PACKAGE = `${API_BASE_URL}/package/create-package`;
export const GET_ALL_PACKAGES = `${API_BASE_URL}/package/get-all-packages`;
export const GET_SINGLE_PACKAGE_BY_ID = `${API_BASE_URL}/package/get-package`;
export const GET_ALL_BIDS_BY_PACKAGE_ID = `${API_BASE_URL}/package/bid/get-all-bids`;
export const MAKE_A_BID = `${API_BASE_URL}/package/bid/create-bid`;
export const UPDATE_AGREEMENT_STATUS = `${API_BASE_URL}/package/update-agreement-status`;
export const SUBMIT_PAYMENT_EVIDENCE = `${API_BASE_URL}/package/payment-evidence/submit-evidence`;
export const ACCEPT_OR_REJECT_BID = `${API_BASE_URL}/package/bid/accept-or-reject-bid`;
export const CREATE_MILESTONE = `${API_BASE_URL}/package/milestone/create-milestone`;
export const GET_ALL_PACKAGE_MILESTONES = `${API_BASE_URL}/package/milestone/get-all-milestones`;
export const COMPLETE_PACKAGE = `${API_BASE_URL}/package/complete-package`;

export const SUBMIT_FEEDBACK = `${API_BASE_URL}/feedback/submit-feedback`;
export const GET_ALL_FEEDBACKS_BY_DRIVER_ID = `${API_BASE_URL}/feedback/get-all-feedbacks`;

export const SEND_CONVERSATION = `${API_BASE_URL}/package/conversation/send-message`;
export const GET_ALL_CONVERSATION = `${API_BASE_URL}/package/get-conversation`;
export const ATTACH_LIVE_LOCATION = `${API_BASE_URL}/package/attach-live-location`;

export const GET_CONTAINER_WEIGHT = `${API_BASE_URL}/package/get-container-weight`;




// Admin

export const GET_ALL_DRIVERS = `${API_BASE_URL}/admin/get-all-drivers`;
export const GET_DRIVER_BY_ID = `${API_BASE_URL}/admin/get-driver`;

export const APPROVE_OR_UNAPPROVE_DRIVER = `${API_BASE_URL}/admin/approve-or-unapprove`;
export const GET_ALL_EVIDENCES = `${API_BASE_URL}/payment-evidence/get-all-evidences`;
export const UPDATE_EVIDENCE_STATUS = `${API_BASE_URL}/payment-evidence/update-status`;
