import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productItem: [],
  symbol: "$",
};

const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
    setProductItem: (state, action) => {
      state.productItem = action.payload;
    },
  },
});
export const { setProductItem } = ProductSlice.actions;

export default ProductSlice.reducer;