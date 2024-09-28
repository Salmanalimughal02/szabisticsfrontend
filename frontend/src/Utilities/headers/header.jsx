import { useSelector } from "react-redux";
import Store from "../../ReaduxToolkit/Store";
import { jwtDecode } from "jwt-decode";
import { decryptData, encryptData } from "../encryption/encryption";
import { getUserRole } from "../globals/globals";

// Retrieve the current state from the Redux store
// var token = state.user.token; // Access the specific value from the state
// // console.log("tokenValue -- >", token);

export const header = () => {
  var token;
  const authToken = localStorage.getItem("token");
  const state = Store.getState();
  if (authToken !== null) {
    getUserRole();
    // console.log("IF part");
    token = authToken;
  } else {
    token = state.user.token;
    getUserRole();
    // console.log("Else part");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const multipartHeader = () => {
  var token;
  const authToken = localStorage.getItem("token");
  const state = Store.getState();
  if (authToken !== null) {
    getUserRole();
    // console.log("IF part");
    token = authToken;
  } else {
    token = state.user.token;
    getUserRole();
    // console.log("Else part");
  }
  return {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };
};

export const serverCredentials = (serverID) => {
  const authToken = localStorage.getItem("token");
  const decodedToken = jwtDecode(authToken);
  // console.log(decodedToken);

  for (let i = 0; i < decodedToken.serverCredentials.length; i++) {
    const element = decodedToken.serverCredentials[i];
    // console.log("element", element);
    if (element.serverId === serverID) {
      // console.log(element);
      return element;
    }
  }
};
