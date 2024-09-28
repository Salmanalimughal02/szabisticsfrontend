import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createPackage: {},
  packages: [],
  filterPackages: [],
  server: {},
  packagee: {},
  loading: false,
  error: null,
  noCompanyFound: "",
  cnicFront: null,
  cnicBack: null,
  ntnFile: null,
  isConnected: true,
  packageImageBase64: null,
  releaseDocument1Base64: null,
  releaseDocument2Base64: null
};

const PackageSlice = createSlice({
  name: "PackageSlice",
  initialState,
  reducers: {
    setCreatePackage: (state, action) => {
      state.createPackage = action.payload;
    },
    setPackagesStart: (state) => {
      state.loading = true;
    },

    setFilterPackages: (state, action) => {
      state.filterPackages = action.payload;
      state.error = null;
      state.loading = false;
    },
    setPackagesEnd: (state) => {
      state.loading = false;
    },

    setPackages: (state, action) => {
      state.packages = action.payload;
      state.error = null;
      state.loading = false;
    },

    setServer: (state, action) => {
      state.server = action.payload;
    },
    setPackage: (state, action) => {
      state.packagee = action.payload;
    },
    setNoCompanyFound: (state, action) => {
      state.noCompanyFound = action.payload;
    },

    setPackageImage: (state, action) => {
      state.packageImageBase64 = action.payload;
    },

    setReleaseDocumentOne: (state, action) => {
      state.releaseDocument1Base64 = action.payload;
    },
    setReleaseDocumentTwo: (state, action) => {
      state.releaseDocument2Base64 = action.payload;
    },

    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});
export const {
  setCreatePackage,
  setPackagesStart,
  setPackages,
  setFilterPackages,
  setPackagesEnd,
  setServer,
  setPackage,
  setNoCompanyFound,
  setPackageImage,
  setReleaseDocumentOne,
  setReleaseDocumentTwo,
  setIsConnected,
} = PackageSlice.actions;

export default PackageSlice.reducer;
