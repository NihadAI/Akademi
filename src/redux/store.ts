import { configureStore } from "@reduxjs/toolkit";
import { studentSlice } from "./features/student/studentSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { teacherSlice } from "./features/teacher/teacherSlice";
import { studentSingleSlice } from "./features/student/studentSingleSlice";
import { teacherSingleSlice } from "./features/teacher/teacherSingleSlice";
import { teacherDeleteSlice } from "./features/teacher/teacherDeleteSlice";
import { studentDeleteSlice } from "./features/student/studentDeleteSlice";
import { studentAddSlice } from "./features/student/studentAddSlice";
import { teacherAddSlice } from "./features/teacher/teacherAddSlice";
import { studentEditSlice } from "./features/student/studentEditSlice";
import { teacherEditSlice } from "./features/teacher/teacherEditSlice";

const store = configureStore({
    reducer:{
        student: studentSlice.reducer,
        teacher: teacherSlice.reducer,
        studentSingle: studentSingleSlice.reducer,
        teacherSingle: teacherSingleSlice.reducer,
        studentDelete: studentDeleteSlice.reducer,
        teacherDelete: teacherDeleteSlice.reducer,
        studentAdd: studentAddSlice.reducer,
        teacherAdd: teacherAddSlice.reducer,
        studentEdit: studentEditSlice.reducer,
        teacherEdit: teacherEditSlice.reducer
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch:()=>AppDispatch=useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState>=useSelector