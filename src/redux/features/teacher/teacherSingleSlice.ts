// import { Teachers } from "@/types/teachers"
import { createSlice } from "@reduxjs/toolkit"
import { fetchTeacherByID } from "./teacherActions"
import { TeacherSingleState } from "@/types/teachers"

const initialState: TeacherSingleState = {
    loading: false,
    teacherData: null, // Changed to null from empty array
    error: '',
}

export const teacherSingleSlice = createSlice({
    name: 'teacherSingle',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTeacherByID.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchTeacherByID.fulfilled, (state, action) => {
            state.loading = false
            state.teacherData = action.payload.data
        })
        .addCase(fetchTeacherByID.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || "Something Went Wrong"
        })
    }
})

export default teacherSingleSlice.reducer