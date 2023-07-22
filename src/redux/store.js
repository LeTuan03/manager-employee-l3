import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '../redux/account/accountSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});
