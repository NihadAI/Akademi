/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit"
import { fetchStudents } from "./studentActions"
import { StudentState } from "@/types/students"

const initialState: StudentState = {
    loading: false,
    students: [],
    error: ''
}

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchStudents.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchStudents.fulfilled, (state, action) => {
            state.loading = false;
            state.students = action.payload.data;
        })
        .addCase(fetchStudents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Something Went Wrong"
        })
    }
})

export default studentSlice.reducer