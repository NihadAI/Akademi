/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit"
import { addStudent } from "./studentActions"
import { StudentAddState } from "@/types/students"

const initialState: StudentAddState = {
    loading: false,
    studentData: null,
    error: ''
}

export const studentAddSlice = createSlice({
    name: "studentAdd",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(addStudent.pending, (state) => {
            state.loading = true
        })
        .addCase(addStudent.fulfilled, (state, action) => {
            state.loading = false
            state.studentData = action.payload.data
        })
        .addCase(addStudent.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something Went Wrong"
        })
    }
})

export default studentAddSlice.reducer