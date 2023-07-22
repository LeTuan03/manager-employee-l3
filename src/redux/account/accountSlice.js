import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doLoginAction: (state,action)=>{
            
        }
    },

    extraReducers: (builder) => {
        
    },
});

export const { doLoginAction } = accountSlice.actions;

export default accountSlice.reducer;
