import { configureStore } from '@reduxjs/toolkit';
import pcBuilderSlice from './pcBuilder/pcBuilderSlice';

const store = configureStore({
  reducer: {
    addedProducts: pcBuilderSlice,
  },
});

export default store;
