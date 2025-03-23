import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productSlice';
import commentsReducer from './slices/commentSlice';
import { productsApi } from '../services/productsApi';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;