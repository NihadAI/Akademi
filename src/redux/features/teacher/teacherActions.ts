import { Teachers } from "@/types/teachers";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addTeacher = createAsyncThunk('teacher/addTeachers', async(teacherData: Teachers, thunkAPI)=>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/teachers`, {
            name: teacherData.name,
            position: teacherData.position,
            phone: teacherData.phone,
            email: teacherData.email,
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
})

export const fetchTeachers = createAsyncThunk('teacher/fetchTeachers', async()=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/teachers`)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.message)
        }
    }
})

export const fetchTeacherByID = createAsyncThunk('teacher/fetchTeacherById', async({teacherId}: {teacherId: string}, thunkAPI) =>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/teachers/${teacherId}`)
        console.log('teacherId:', response.data);
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
})

export const editTeacher = createAsyncThunk('teacher/editTeacher', async({teacherId, teacherData}: {teacherId: string, teacherData: Teachers}, thunkAPI) =>{
    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/teachers/${teacherId}`, {
            name: teacherData.name,
            position: teacherData.position,
            phone: teacherData.phone,
            email: teacherData.email,
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
})

export const deleteTeacher = createAsyncThunk('teacher/deleteTeacher', async({teacherId}: {teacherId: string}, thunkAPI)=>{
    try {
        const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/teachers/${teacherId}`)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
})