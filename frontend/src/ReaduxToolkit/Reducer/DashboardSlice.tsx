import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generalData: null,
  operatorPerformance: [],
  alertsOverview: null,
  alertsPending: [],
  loading: false,
  error: null,
  isConnected: true,
};

const DashboardSlice = createSlice({
  name: "DashboardSlice",
  initialState,
  reducers: {
    setGeneralData: (state, action) => {
      state.generalData = action.payload;
    },
    setOperatorPerformance: (state, action) => {
      state.operatorPerformance = action.payload;
    },

    setAlertsOverview: (state, action) => {
      state.alertsOverview = action.payload;
    },
    setAlertsPending: (state, action) => {
      state.alertsPending = action.payload;
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});
export const {
  setIsConnected,
  setGeneralData,
  setOperatorPerformance,
  setAlertsOverview,
  setAlertsPending,
} = DashboardSlice.actions;

export default DashboardSlice.reducer;
