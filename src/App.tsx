import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/students/Students";
import Teachers from "./pages/teachers/Teachers";
import Finance from "./pages/Finance";
import Events from "./pages/Events";
import AddNewStudent from "./pages/students/AddNewStudent";
import StudentProfile from "./pages/students/StudentProfile";
import TeacherProfile from "./pages/teachers/TeacherProfile";
import User from "./pages/User";
import AddNewTeacher from "./pages/teachers/AddNewTeacher";
import EditStudent from "./pages/students/EditStudent";
import EditTeacher from "./pages/teachers/EditTeacher";
import Food from "./pages/food/Food";
import FoodProfile from "./pages/food/Foodprofile";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Dashboard/>}/>
        <Route path="/students" element={<Students/>}/>
        <Route path="/students/addNew" element={<AddNewStudent/>}/>
        <Route path="/students/:studentId" element={<StudentProfile/>}/>
        <Route path="/students/edit/:studentId" element={<EditStudent/>}/>
        <Route path="/teachers" element={<Teachers/>}/>
        <Route path="/teachers/:teacherId" element={<TeacherProfile/>}/>
        <Route path="/teachers/edit/:teacherId" element={<EditTeacher/>}/>
        <Route path="/teachers/addNew" element={<AddNewTeacher/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/finance" element={<Finance/>}/>
        <Route path="/food" element={<Food/>}/>
        <Route path="/food/:foodId" element={<FoodProfile/>}/>
        <Route path="/user" element={<User/>}/>
      </Routes>
    </BrowserRouter>
  )
}
