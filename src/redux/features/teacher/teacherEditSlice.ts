/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit"
import { editTeacher } from "./teacherActions"
import { TeacherEditState } from "@/types/teachers"

const initialState: TeacherEditState = {
    loading: false,
    teacherData: null,
    error: ''
}

export const teacherEditSlice = createSlice({
    name: "teacherEdit",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(editTeacher.pending, (state) => {
            state.loading = true
        })
        .addCase(editTeacher.fulfilled, (state, action) => {
            state.loading = false
            state.teacherData = action.payload.data
        })
        .addCase(editTeacher.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something Went Wrong"
        })
    }
})

export default teacherEditSlice.reducer