import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { searchEmployee } from '../../services/api'
import { message } from 'antd'

const initialState = {
    listEmployee: [],
    text: 0,
    open: {
        modalInput: false,
        modalProfile: false,
        modalEnd: false,
        modalSendLeader: false,
        modalUpdateHappening:false
    }
}

export const getAllEmployee = createAsyncThunk(
    'employees/getAllEmployees',
    async (param) => {
        try {
            const response = await searchEmployee(param)
            return response?.data?.data
        } catch (error) {
            message.error(error.message)
        }
    }
)
const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllEmployee.fulfilled, (state, action) => {
                state.listEmployee = action.payload
            })
    },
})
export const {setOpen } = employeeSlice.actions;
export default employeeSlice.reducer