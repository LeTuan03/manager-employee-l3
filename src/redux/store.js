import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '../redux/account/accountSlice';
import employeeSlice from './employee/employeeSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    employee:employeeSlice
  },
});
