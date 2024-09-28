import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userData: null,
  serverPermissions: [],
  loginData: null,
  errorData: false,
};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setServerPermissions: (state, action) => {
      state.serverPermissions = action.payload;
    },
    setLoginData: (state, action) => {
      state.loginData = action.payload;
    },
    setErrorData: (state, action) => {
      state.errorData = action.payload;
    },
  },
});
export const {
  setToken,
  setUserData,
  setServerPermissions,
  setLoginData,
  setErrorData,
} = UserSlice.actions;

export default UserSlice.reducer;
