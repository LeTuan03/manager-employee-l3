import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getEmployeeById, searchEmployee } from "../../services/api";
import { message } from "antd";

const initialState = {
    listEmployee: [],
    employee: {},
    open: {
        modalInput: false,
        modalProfile: false,
        modalEnd: false,
        modalSendLeader: false,
        modalSendLeaderUpdateHappening: false,
        modalUpdateHappening: false,
        modalResume: false,
    },
    isLoading: false,
    isError: false,
};

export const getAllEmployee = createAsyncThunk(
    "employees/getAllEmployees",
    async (param) => {
        try {
            const response = await searchEmployee(param?.status,param?.search);
            return response?.data?.data;
        } catch (error) {
            message.error(error.message);
        }
    }
);
export const getEmployee = createAsyncThunk(
    "employees/getEmployeeById",
    async (id) => {
        try {
            const response = await getEmployeeById(id);
            return response?.data?.data;
        } catch (error) {
            message.error(error.message);
        }
    }
);
const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload;
        },
        resetEmployee: (state) => {
            state.employee = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllEmployee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.listEmployee = action.payload;
            })
            .addCase(getEmployee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.employee = action.payload;
            });
    },
});
export const { setOpen, resetEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
