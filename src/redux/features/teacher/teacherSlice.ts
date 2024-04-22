// import { Teachers } from "@/types/teachers"
import { createSlice } from "@reduxjs/toolkit"
import { fetchTeachers } from "./teacherActions"
import { TeachersState } from "@/types/teachers"


const initialState: TeachersState = {
    loading: false,
    teachers: [],
    error: '',
}

export const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTeachers.pending, (state) =>{
            state.loading = true
        })
        .addCase(fetchTeachers.fulfilled, (state, action) =>{
            state.loading = false
            state.teachers = action.payload.data;
        })
        .addCase(fetchTeachers.rejected, (state, action) =>{
            state.loading = false
            state.error = action.error.message || "Something Went Wrong"
        })
    }
})

export default teacherSlice.reducer