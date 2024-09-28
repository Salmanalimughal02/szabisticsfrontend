import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  devices: [],
  serverDevices: [],
  selectedDevices: [],
  devicesStatuses: [],
  devicesDetailData: [],
  noDevicesFound: "",
  loading: false,
  error: null,
  expandedDevice: null,
  isConnected: true,
  item: null,
};

const MonitoringSlice = createSlice({
  name: "MonitoringSlice",
  initialState,
  reducers: {
    setDevicesStart: (state) => {
      state.loading = true;
    },
    setDevices: (state, action) => {
      state.devices = action.payload;
      state.error = null;
      state.loading = false;
    },

    setServerDevices: (state, action) => {
      state.serverDevices = action.payload;
      state.error = null;
      state.loading = false;
    },
    setSelecetdDevices: (state, action) => {
      state.selectedDevices = action.payload;
      state.error = null;
      state.loading = false;
    },
    setDevicesStatuses: (state, action) => {
      state.devicesStatuses = action.payload;
      state.error = null;
      state.loading = false;
    },
    setDevicesDetailData: (state, action) => {
      state.devicesDetailData = action.payload;
    },
    setExpandedDevice: (state, action) => {
      state.expandedDevice = action.payload;
    },
    setItem: (state, action) => {
      state.item = action.payload;
    },

    setDevicesEnd: (state) => {
      state.loading = false;
    },

    setNoDevicesFound: (state, action) => {
      state.noDevicesFound = action.payload;
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});
export const {
  setDevices,
  setDevicesStart,
  setDevicesEnd,
  setNoDevicesFound,
  setServerDevices,
  setSelecetdDevices,
  setDevicesStatuses,
  setDevicesDetailData,
  setExpandedDevice,
  setItem,
  setIsConnected,
} = MonitoringSlice.actions;

export default MonitoringSlice.reducer;
