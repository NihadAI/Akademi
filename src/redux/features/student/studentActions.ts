import { Students } from "@/types/students"
import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const addStudent = createAsyncThunk('student/addStudent', async(studentData: Students, thunkAPI) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/students`, {
            name: studentData.name,
            time: studentData.time,
            parent_name: studentData.parent_name,
            city: studentData.city,
            phone: studentData.phone,
            email: studentData.email,
            grade: studentData.grade
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
})

export const fetchStudents = createAsyncThunk('student/fetchStudents', async() =>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/students`)
        
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return Promise.reject(error.message)
        }
    }
})

export const fetchStudentByID = createAsyncThunk('student/fetchStudentByID', async({studentId}: {studentId: string}, thunkAPI) =>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/students/${studentId}`)
        console.log('studentId:', response.data);
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
})

export const editStudent = createAsyncThunk('student/editStudent', async({studentId, studentData}: {studentId: string, studentData: Students}, thunkAPI) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/students/${studentId}`, {
            name: studentData.name,
            time: studentData.time,
            parent_name: studentData.parent_name,
            city: studentData.city,
            phone: studentData.phone,
            email: studentData.email,
            grade: studentData.grade
        })
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
})

export const deleteStudent = createAsyncThunk('student/deleteStudentByID', async({studentId}: {studentId: string}, thunkAPI) =>{
    try {
        const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/students/${studentId}`)
        console.log('studentId:', response.data);
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
})
