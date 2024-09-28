import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userPersonalizationData: null,
  isConnected: true,
};

const PersonalizationSlice = createSlice({
  name: "PersonalizationSlice",
  initialState,
  reducers: {
    setUserPersonalizationData: (state, action) => {
      state.userPersonalizationData = action.payload;
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});
export const { setUserPersonalizationData,setIsConnected } = PersonalizationSlice.actions;

export default PersonalizationSlice.reducer;
