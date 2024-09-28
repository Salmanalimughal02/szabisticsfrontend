import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  noDataFound: "",
};

const NoDataFoundSlice = createSlice({
  name: "NoDataFoundSlice",
  initialState,
  reducers: {
    setNoDataFound: (state, action) => {
      state.noDataFound = action.payload;
    },
  },
});
export const { setNoDataFound } = NoDataFoundSlice.actions;

export default NoDataFoundSlice.reducer;
