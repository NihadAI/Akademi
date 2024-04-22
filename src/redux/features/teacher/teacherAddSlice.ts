// import { Teachers } from "@/types/teachers"
import { createSlice } from "@reduxjs/toolkit"
import { addTeacher } from "./teacherActions"
import { TeacherAddState } from "@/types/teachers"

const initialState: TeacherAddState = {
    loading: false,
    teacherData: null, // Changed to null from empty array
    error: '',
}

export const teacherAddSlice = createSlice({
    name: 'teacherAdd',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(addTeacher.pending, (state) => {
            state.loading = true
        })
        .addCase(addTeacher.fulfilled, (state, action) => {
            state.loading = false
            state.teacherData = action.payload.data
        })
        .addCase(addTeacher.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something Went Wrong"
        })
    }
})

export default teacherAddSlice.reducer