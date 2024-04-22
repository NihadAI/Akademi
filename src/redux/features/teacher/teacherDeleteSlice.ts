// import { Teachers } from "@/types/teachers"
import { createSlice } from "@reduxjs/toolkit"
import { deleteTeacher } from "./teacherActions"
import { TeacherDeleteState } from "@/types/teachers"

const initialState: TeacherDeleteState = {
    loading: false,
    error: '',
}

export const teacherDeleteSlice = createSlice({
    name: 'teacherDelete',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(deleteTeacher.pending, (state) => {
            state.loading = true
            state.error = ''
        })
        .addCase(deleteTeacher.fulfilled, (state) => {
            state.loading = false
        })
        .addCase(deleteTeacher.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something Went Wrong"
        })
    }
})

export default teacherDeleteSlice.reducer