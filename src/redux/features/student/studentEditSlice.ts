/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit"
import { editStudent } from "./studentActions"
import { StudentEditState } from "@/types/students"

const initialState: StudentEditState = {
    loading: false,
    studentData: null,
    error: ''
}

export const studentEditSlice = createSlice({
    name: "studentEdit",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(editStudent.pending, (state) => {
            state.loading = true
        })
        .addCase(editStudent.fulfilled, (state, action) => {
            state.loading = false
            state.studentData = action.payload.data
        })
        .addCase(editStudent.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something Went Wrong"
        })
    }
})

export default studentEditSlice.reducer