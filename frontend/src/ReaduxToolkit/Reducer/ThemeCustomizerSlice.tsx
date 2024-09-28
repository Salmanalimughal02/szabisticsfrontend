import { createSlice } from "@reduxjs/toolkit";
import ConfigDB from "../../Config/ThemeConfig";

const default_color = ConfigDB.data.color.primary_color;
const secondary_color = ConfigDB.data.color.secondary_color;

const initialState = {
  layout: "material-icon",
  openCus: false,
  sidebarIconType: "stroke",
  colorBackground1: default_color,
  colorBackground2: secondary_color,
  mix_background_layout:"light",
};

const ThemeCustomizerSlice = createSlice({
  name: "ThemeCustomizer",
  initialState,
  reducers: {
    setLayout: (state, action) => {
      state.layout = action.payload;
    },
    setOpenCus: (state, action) => {
      state.openCus = action.payload;
    },
    setColorBackground1: (state, action) => {
      state.colorBackground1 = action.payload;
    },
    setColorBackground2: (state, action) => {
      state.colorBackground2 = action.payload;
    },
    addSidebarLayouts: (state, action) => {
      state.layout = action.payload;
      state.openCus = false;
    },
    addSidebarIconType: (state, action) => {
      ConfigDB.data.settings.sidebar.iconType = action.payload;
      state.sidebarIconType = action.payload;
      state.openCus = false;
    },
    setMixBackgroundLayout: (state, action) => {
      state.mix_background_layout = action.payload;
    },
  },
});

export const {setMixBackgroundLayout, setColorBackground2, setColorBackground1, setLayout, setOpenCus, addSidebarLayouts, addSidebarIconType } = ThemeCustomizerSlice.actions;

export default ThemeCustomizerSlice.reducer;