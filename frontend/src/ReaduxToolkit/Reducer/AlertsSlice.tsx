import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  liveAlerts: [],
  liveAlertsData: null,
  assignedAlerts: [],
  completedAlerts: [],
  modalData: null,
  sendCommandsType: [],
  killedDevices: [],
  selfSendCommands: [],
  preInfos: [],
  deviceSelecetdAlerts: null,
  dashboardStatistics: null,
  loading: false,
  error: null,
  noCountryFound: "",
  isConnected: true,
};

const AlertsSlice = createSlice({
  name: "AlertsSlice",
  initialState,
  reducers: {
    setAlertsStart: (state) => {
      state.loading = true;
    },
    setLiveAlertsData: (state, action) => {
      state.liveAlertsData = action.payload;
      state.error = null;
      state.loading = false;
    },
    setLiveAlerts: (state, action) => {
      state.liveAlerts = action.payload;
      state.error = null;
      state.loading = false;
    },
    setAssignedAlerts: (state, action) => {
      state.assignedAlerts = action.payload;
      state.error = null;
      state.loading = false;
    },
    setCompletedAlerts: (state, action) => {
      state.completedAlerts = action.payload;
      state.error = null;
      state.loading = false;
    },
    setModalData: (state, action) => {
      state.modalData = action.payload;
      state.error = null;
      state.loading = false;
    },
    setSendCommandsType: (state, action) => {
      state.sendCommandsType = action.payload;
    },
    setKilledDevices: (state, action) => {
      state.killedDevices = action.payload;
    },
    setPreInfoAlerts: (state, action) => {
      state.preInfos = action.payload;
    },
    setDeviceSelecetdAlerts: (state, action) => {
      state.deviceSelecetdAlerts = action.payload;
    },

    setSelfSendCommands: (state, action) => {
      state.selfSendCommands = action.payload;
    },
    setDashboardStatistics: (state, action) => {
      state.dashboardStatistics = action.payload;
    },

    setAlertsEnd: (state) => {
      state.loading = false;
    },

    setNoAlertsFound: (state, action) => {
      state.noCountryFound = action.payload;
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});
export const {
  setLiveAlerts,
  setLiveAlertsData,
  setAlertsStart,
  setAssignedAlerts,
  setCompletedAlerts,
  setModalData,
  setSendCommandsType,
  setKilledDevices,
  setSelfSendCommands,
  setPreInfoAlerts,
  setDeviceSelecetdAlerts,
  setDashboardStatistics,
  setAlertsEnd,
  setNoAlertsFound,
  setIsConnected,
} = AlertsSlice.actions;

export default AlertsSlice.reducer;
