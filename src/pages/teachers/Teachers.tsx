import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"
import DefaultLayout from "@/layout/DefaultLayout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link, NavLink } from "react-router-dom"
import { Mail, MoreHorizontal, Phone, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import UserOne from "../../images/user/user-01.png"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { deleteTeacher, fetchTeachers } from "@/redux/features/teacher/teacherActions"
import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

const Teacher: React.FC = () => {
    const teachers = useAppSelector((state) => state.teacher.teachers)
    const dispatch = useAppDispatch()
    const {toast} = useToast()
    const currentDate = new Date().toLocaleString();
    useEffect(() => {
      dispatch(fetchTeachers())
    }, [dispatch])

    const handleDeleteTeacher = (teacherId: string) => {
        dispatch(deleteTeacher({teacherId: teacherId})).then(() => dispatch(fetchTeachers()))    
            toast({
                variant: "default",
                title: "Teacher Deleted Successfully",
                description: currentDate,
              })
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName={"Teachers"} />
            <div className="w-full flex justify-end">
                <Link to={"addNew"}>
                    <Button variant="outline" className="mr-4 capitalize bg-purple text-white hover:bg-primary ">
                        <span><Plus /></span>add new Teacher 
                    </Button>
                </Link>
            </div>
            <div className="flex h-screen flex-wrap justify-start -mx-4">
                {teachers.map((teacher) => (
                    <div className="w-full sm:w-1/2 xl:w-1/4 p-4" key={teacher.id}>
                    <Card className="relative bg-white dark:bg-meta-4 shadow-default">
                    <CardHeader className="">
                        <div className="flex flex-col text-center">
                            <Avatar className="h-25 w-25 mx-auto mb-4" >
                                <AvatarImage src={UserOne} alt="" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <CardTitle className="capitalize">{teacher.name}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="text-center text-slate-400">
                        <p className="capitalize">{teacher.position}</p>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full justify-center gap-3">
                            <Link to="#" type="phone"
                                onClick={() => navigator.clipboard.writeText(teacher.phone)}
                                className="relative flex h-10 w-10 items-center justify-center rounded-full border-[0.5px] border-stroke bg-purple text-white hover:text-gray-4 dark:border-strokedark dark:bg-black dark:text-white">
                            <Phone />
                            </Link>
                            <Link to="#" type="email"
                                className="relative flex h-10 w-10 items-center justify-center rounded-full border-[0.5px] border-stroke bg-purple text-white hover:text-gray-4 dark:border-strokedark dark:bg-black dark:text-white">
                            <Mail />
                            </Link>
                        </div>
                    </CardFooter>
                    <div className="absolute top-4 right-7">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-6 w-6 text-slate-500" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white dark:bg-meta-4" align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem className="hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer"
                                onClick={() => navigator.clipboard.writeText(teacher.id?.toString() || '')}
                                >
                                    Copy Teacher ID
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <NavLink to={`/teachers/${teacher.id}`}><DropdownMenuItem className="hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer">View teacher</DropdownMenuItem></NavLink>
                                <NavLink to={`/teachers/edit/${teacher.id}`}><DropdownMenuItem className="hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer">Edit teacher</DropdownMenuItem></NavLink>
                                <DropdownMenuItem className="hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer">View class</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteTeacher(teacher.id?.toString() || '')} className="hover:bg-slate-200 cursor-pointer text-red-500">Delete Teacher</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    </Card>
                    </div>
                ))}
            </div>
        </DefaultLayout>
    )
}

export default Teacher