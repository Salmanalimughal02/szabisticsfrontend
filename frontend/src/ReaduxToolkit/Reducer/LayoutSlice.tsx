import { createSlice } from "@reduxjs/toolkit";
import { LayoutSliceInterFace } from "../Types";

const initialState: LayoutSliceInterFace = {
  toggleSidebar: false,
  scroll: false,
};

const LayoutSlice = createSlice({
  name: "LayoutSlice",
  initialState,
  reducers: {
    setToggleSidebar: (state,action) => {
      state.toggleSidebar = action.payload;
    },
    setScrollMenu: (state, action) => {
      state.scroll = action.payload;
    },
  },
});
export const { setToggleSidebar,setScrollMenu } = LayoutSlice.actions;

export default LayoutSlice.reducer;
