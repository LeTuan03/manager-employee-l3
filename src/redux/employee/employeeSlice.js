import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getEmployeeById, searchEmployee } from '../../services/api'
import { message } from 'antd'

const initialState = {
    listEmployee: [],
    employee: {},
    open: {
        modalInput: false,
        modalProfile: false,
        modalEnd: false,
        modalSendLeader: false,
        modalUpdateHappening: false,
        modalResume:false
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
export const getEmployee = createAsyncThunk(
    'employees/getEmployeeById',
    async (id) => {
        try {
            const response = await getEmployeeById(id)
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
        },
        resetEmployee: (state) => {
            state.employee = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllEmployee.fulfilled, (state, action) => {
                state.listEmployee = action.payload
            })
            .addCase(getEmployee.fulfilled, (state, action) => {
                state.employee = action.payload
            })
    },
})
export const { setOpen,resetEmployee } = employeeSlice.actions;
export default employeeSlice.reducer