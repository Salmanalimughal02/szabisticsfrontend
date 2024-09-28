import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userPermissions: [],
};

const PermissionsSlice = createSlice({
  name: "PermissionsSlice",
  initialState,
  reducers: {
    setUserPermissions: (state, action) => {
      state.userPermissions = action.payload;
    },
  },
});
export const { setUserPermissions } = PermissionsSlice.actions;

export default PermissionsSlice.reducer;
