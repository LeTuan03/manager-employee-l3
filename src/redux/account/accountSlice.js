import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    role: null,
};

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        doLoginAction: (state, action) => {
            state.isAuthenticated = true;
            state.role = action.payload;
        },
    },
});

export const { doLoginAction } = accountSlice.actions;

export default accountSlice.reducer;
