// import { ProvinceType } from "../Pages/Province/ProvinceTypes/ProvinceTypes";

import Swal from "sweetalert2";
import { header, multipartHeader } from "../headers/header";
import axios from "axios";
import errorAlert from "../alerts/ErrorAlert";
import successAlert from "../alerts/SuccessAlert";
import { LOGIN } from "./apiEndpoints";
import { ERROR_MESSAGE, ERROR_TEXT } from "../constants/constants";
const api = `${process.env.PUBLIC_URL}/api`;
export const ChatMemberApi = `${api}/chatMember.json`;
export const ChatApi = `${api}/chats.json`;

// // api.ts

export const API_BASE_URL = "http://124.29.238.127:8080/api/v1";
export const IMAGE_BASE_URL = "http://124.29.238.127:8080";

interface URLTypes {
  url: string;
}

interface loginTypes {
  emailAddress: string; // Change 'boolean' to the actual type of isVisible
  password: string;
}


export const login = async (postData: loginTypes): Promise<void> => {
  if (!navigator.onLine) {
    Swal.fire({
      text: ERROR_TEXT,
      icon: "error",
      timer: 2000,
      showCancelButton: false,
    });
    // throw new Error(ERROR_TEXT);
    const error: any = {
      success: false,
      message: ERROR_MESSAGE,
      statusCode: 400,
    };
    return error;
  }
  try {
    const response = await fetch(LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const result = await response.json();
    // console.log(result);

    if (!result["success"]) {
      // console.log("result: ", result);
      if (result.statusCode !== 401) {
        var alertData = {
          title: "Invalid Login",
          text: result.message,
        };
        // console.log("alertData: 1 ", alertData);
        errorAlert(alertData);
      }

      // throw new Error("Failed to login ");
      return result;
    }
    if (result.statusCode === 200) {
      successAlert();
    }
    return result;
  } catch (error: any) {
    // console.error("Error creating login:", error);
    // throw new Error("Failed to create ciloginty");
  }
};

export const create = async (postData: any, url: URLTypes): Promise<void> => {
  if (!navigator.onLine) {
    Swal.fire({
      text: ERROR_TEXT,
      icon: "error",
      timer: 2000,
      showCancelButton: false,
    });
    // throw new Error(ERROR_TEXT);
    const error: any = {
      success: false,
      message: ERROR_MESSAGE,
      statusCode: 401,
    };
    return error;
  }
  try {
    const response = await axios.post(url.url, postData, {
      headers: header(),
    });

    const result = response.data;
    // console.log("Response data:", response.data);

    return result;
  } catch (error: any) {
    // console.error("Error creating:", error.message);
    return error.response.data;
  }
};
export const otpEnabled = async (
  isSecurityEnabled: boolean,
  url: URLTypes
): Promise<void> => {
  if (!navigator.onLine) {
    Swal.fire({
      text: ERROR_TEXT,
      icon: "error",
      timer: 2000,
      showCancelButton: false,
    });
    // throw new Error(ERROR_TEXT);
    const error: any = {
      success: false,
      message: ERROR_MESSAGE,
      statusCode: 401,
    };
    return error;
  }
  // -----------------------
  try {
    const response = await axios.patch(
      url.url,
      { isSecurityEnabled: isSecurityEnabled },
      {
        headers: header(),
      }
    );

    const result = response.data;
    // console.log("Response data:", response.data);

    return result;
  } catch (error: any) {
    // console.error("Error OTPEnabled:", error.message);
    return error.response.data;
  }
};

export const resendOTP = async (userId: any, url: URLTypes): Promise<void> => {
  if (!navigator.onLine) {
    Swal.fire({
      text: ERROR_TEXT,
      icon: "error",
      timer: 2000,
      showCancelButton: false,
    });
    // throw new Error(ERROR_TEXT);
    const error: any = {
      success: false,
      message: ERROR_MESSAGE,
      statusCode: 401,
    };
    return error;
  }
  // -----------------------
  try {
    const response = await axios.post(
      url.url,
      { userId: userId },
      {
        headers: header(),
      }
    );

    const result = response.data;
    // console.log("Response data:", response.data);

    return result;
  } catch (error: any) {
    // console.error("Error resendOTP:", error.message);
    return error.response.data;
  }
};

export const createCom = async (
  formData: FormData,
  url: URLTypes
): Promise<void> => {
  if (!navigator.onLine) {
    Swal.fire({
      text: ERROR_TEXT,
      icon: "error",
      timer: 2000,
      showCancelButton: false,
    });
    // throw new Error(ERROR_TEXT);
    const error: any = {
      success: false,
      message: ERROR_MESSAGE,
      statusCode: 401,
    };
    return error;
  }
  // -----------------------
  try {
    const response = await axios.post(url.url, formData, {
      headers: multipartHeader(),
    });
    // console.log("api call -- >");

    const result = response.data;
    // console.log("Response data:", response.data);

    return result;
  } catch (error: any) {
    // console.error("Error creatingCompany:", error.message);
    return error.response.data;
  }
};

export const update = async (postData: any, url: URLTypes): Promise<void> => {
  if (!navigator.onLine) {
    Swal.fire({
      text: ERROR_TEXT,
      icon: "error",
      timer: 2000,
      showCancelButton: false,
    });
    // throw new Error(ERROR_TEXT);
    const error: any = {
      success: false,
      message: ERROR_MESSAGE,
      statusCode: 401,
    };
    return error;
  }
  // -----------------------
  try {
    const response = await axios.put(url.url, postData, {
      headers: header(),
    });

    const result = response.data;
    // console.log("Response data:", response.data);

    return result;
  } catch (error: any) {
    // console.error("Error updating:", error.message);
    return error.response.data;
  }
};

export const updateWithMultipart = async (
  postData: any,
  url: URLTypes
): Promise<void> => {
  if (!navigator.onLine) {
    Swal.fire({
      text: ERROR_TEXT,
      icon: "error",
      timer: 2000,
      showCancelButton: false,
    });
    // throw new Error(ERROR_TEXT);
    const error: any = {
      success: false,
      message: ERROR_MESSAGE,
      statusCode: 401,
    };
    return error;
  }
  // -----------------------
  try {
    const response = await axios.put(url.url, postData, {
      headers: multipartHeader(),
    });

    const result = response.data;
    // console.log("Response data:", response.data);

    return result;
  } catch (error: any) {
    // console.error("Error updatingMultipart:", error.message);
    return error.response.data;
  }
};

export const createWithMultipart = async (
  postData: any,
  url: URLTypes
): Promise<void> => {
  if (!navigator.onLine) {
    Swal.fire({
      text: ERROR_TEXT,
      icon: "error",
      timer: 2000,
      showCancelButton: false,
    });
    // throw new Error(ERROR_TEXT);
    const error: any = {
      success: false,
      message: ERROR_MESSAGE,
      statusCode: 401,
    };
    return error;
  }
  // -----------------------
  try {
    const response = await axios.post(url.url, postData, {
      headers: multipartHeader(),
    });

    const result = response.data;
    // console.log("Response data:", response.data);
    return result;
  } catch (error: any) {
    // console.error("Error creatingMultipart:", error.response.data);
    return error.response.data;
  }
};

export const patch = async (postData: any, url: URLTypes): Promise<void> => {
  if (!navigator.onLine) {
    Swal.fire({
      text: ERROR_TEXT,
      icon: "error",
      timer: 2000,
      showCancelButton: false,
    });
    // throw new Error(ERROR_TEXT);
    const error: any = {
      success: false,
      message: ERROR_MESSAGE,
      statusCode: 401,
    };
    return error;
  }
  // -----------------------
  try {
    const response = await axios.patch(url.url, postData, {
      headers: header(),
    });

    const result = response.data;
    // console.log("Response data:", response.data);
    return result;
  } catch (error: any) {
    // console.error("Error when Patching:", error.message);
    return error.response.data;
  }
};

export const deleteSingle = async (url: URLTypes): Promise<void> => {
  if (!navigator.onLine) {
    Swal.fire({
      text: ERROR_TEXT,
      icon: "error",
      timer: 2000,
      showCancelButton: false,
    });
    // throw new Error(ERROR_TEXT);
    const error: any = {
      success: false,
      message: ERROR_MESSAGE,
      statusCode: 401,
    };
    return error;
  }
  // -----------------------
  // console.log(`${API_BASE_URL}/${url.url}`);
  // console.log(header());

  try {
    const response = await axios.delete(url.url, {
      headers: header(),
    });
    const result = response.data;
    // console.log("Response data:", response.data);
    return result;
  } catch (error: any) {
    // console.error("Error deleting:", error.message);
    return error.response.data;
  }
};

export const getAll = async (url: URLTypes): Promise<void> => {
  if (!navigator.onLine) {
    const error: any = {
      success: false,
      message: ERROR_MESSAGE,
      // statusCode: 401,
    };
    return error;
  }
  // -----------------------
  // console.log(`${API_BASE_URL}/${url.url}`);
  // console.log(header());

  try {
    const response = await axios.get(url.url, {
      headers: header(),
    });
    const result = response.data;

    return result;
  } catch (error: any) {
    return error.response.data;
    // if (error.response.data.statusCode == 401) {
    //   Swal.fire({
    //     text: `${error.response.data.message}`,
    //     icon: "error",
    //     showConfirmButton: true,
    //   });
    // } else {
    //   return error.response.data;
    // }
  }
};

export const getImage = async (url: URLTypes) => {
  try {
    // const response = await axios.get(`${url.url}`, {
    //   headers: multipartHeader
    // })
    const response = await fetch(url.url, {
      method: "GET",
      headers: {
        Authorization: header().Authorization,
      },
    });
    const blob = await response.blob();
    const objectURL = URL.createObjectURL(blob);
    const result = objectURL;

    return result;

    // Handle success (optional)
  } catch (error: any) {
    // console.error("Error get-all:", error);
  }
};

// import axios from "axios";
// import { BASE_URL } from "./constant";

// const token = localStorage.getItem("token");
// // GLOBAL POST REQUEST WITH AUTHRIZATION
// const POST = async (path, token, data) => {
//   // SETTING UP HEADER
//   const HEADER = {
//     headers: token
//       ? {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         }
//       : {
//           "Content-Type": "application/json",
//         },
//   };
//   // GETTING RESPONSE
//   let res = await axios.post(BASE_URL + path, data, HEADER);
//   return res.data;
// };

// // GLOBAL GET REQUEST WITH AUTHRIZATION
// const GET = async (path, token, params) => {
//   // SETTING UP HEADER & PARAMS
//   const HEADER = {
//     headers: token
//       ? {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           params: params,
//         }
//       : {
//           "Content-Type": "application/json",
//           params: params,
//         },
//   };
//   // GETTING RESPONSE
//   let res = await axios.get(BASE_URL + path + params, HEADER);
//   return res.data;
// };

// // GLOBAL PUT REQUEST WITH AUTHRIZATION
// const PUT = async (path, token, params, data) => {
//   // SETTING UP HEADER & PARAMS
//   const HEADER = {
//     headers: token
//       ? {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         }
//       : {
//           "Content-Type": "application/json",
//         },
//   };
//   // GETTING RESPONSE
//   let res = await axios.put(BASE_URL + path + "/" + params, data, HEADER);
//   return res.data;
// };

// // GLOBAL DELETE REQUEST WITH AUTHRIZATION
// const DELETE = async (path, token, params) => {
//   // SETTING UP HEADER & PARAMS
//   const HEADER = {
//     headers: token
//       ? {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           params: params,
//         }
//       : {
//           "Content-Type": "application/json",
//           params: params,
//         },
//   };
//   // GETTING RESPONSE
//   let res = await axios.delete(BASE_URL + path, HEADER);
//   return res.data;
// };

// export { POST, GET, PUT, DELETE };

// const LIVE_URL = "https://koko-ranch.herokuapp.com";
// const LOCAL_URL = "http://localhost:4000";

// // const BASE_URL = LIVE_URL;
// const BASE_URL = LOCAL_URL;
// const TOKEN = localStorage.getItem("token");

// export { LIVE_URL, LOCAL_URL, TOKEN, BASE_URL };
