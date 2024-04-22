import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import DefaultLayout from "../../layout/DefaultLayout"
import { DataTable, columns } from "./DataTable";
import { useAppDispatch, useAppSelector} from "@/redux/store";
import { useEffect } from "react";
import { deleteStudent, fetchStudents } from "@/redux/features/student/studentActions";
import { useToast } from "@/components/ui/use-toast";

const Students:React.FC = () => {
    const students = useAppSelector((state) => state.student.students)
    const dispatch = useAppDispatch()
    const {toast} = useToast()
    const currentDate = new Date().toLocaleString();

    useEffect(() => {
      dispatch(fetchStudents())
    }, [dispatch])
    
    const handleDeleteStudent =(studentId: string) =>{
        dispatch(deleteStudent({studentId: studentId})).then(() => dispatch(fetchStudents()))
        toast({
            variant: "default",
            title: "Student Deleted Successfully",
            description: currentDate,
          })
    }
    
    return(
        <DefaultLayout>
            <Breadcrumb pageName={'Students'} />
            <div className="container mx-auto py-10 h-screen">
                <DataTable columns={columns} data={students} onDelete={handleDeleteStudent}/>
            </div>
        </DefaultLayout>
    )
}

export default Students;