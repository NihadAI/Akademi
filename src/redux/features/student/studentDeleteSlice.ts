/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit"
import { deleteStudent } from "./studentActions"
import { StudentDeleteState } from "@/types/students"

const initialState: StudentDeleteState = {
    loading: false,
    studentData: null,
    error: ''
}

export const studentDeleteSlice = createSlice({
    name: "studentDelete",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(deleteStudent.pending, (state) => {
            state.loading = true
        })
        .addCase(deleteStudent.fulfilled, (state) => {
            state.loading = false
        })
        .addCase(deleteStudent.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something Went Wrong"
        })
    }
})

export default studentDeleteSlice.reducer