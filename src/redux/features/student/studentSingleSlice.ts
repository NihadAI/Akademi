/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit"
import { fetchStudentByID } from "./studentActions"
import { StudentSingleState } from "@/types/students"

const initialState: StudentSingleState = {
    loading: false,
    studentData: null,
    error: ''
}

export const studentSingleSlice = createSlice({
    name: "studentSingle",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchStudentByID.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchStudentByID.fulfilled, (state, action) => {
            state.loading = false
            state.studentData = action.payload.data
        })
        .addCase(fetchStudentByID.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something Went Wrong"
        })
    }
})

export default studentSingleSlice.reducer