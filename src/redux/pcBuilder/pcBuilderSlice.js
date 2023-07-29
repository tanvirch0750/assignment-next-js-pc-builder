import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const pcBuilderSlice = createSlice({
  name: 'pcBuilder',
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.push(action.payload);
    },
    removeProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addProducts, removeProduct } = pcBuilderSlice.actions;
export default pcBuilderSlice.reducer;
