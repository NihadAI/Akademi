import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import DefaultLayout from '@/layout/DefaultLayout'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { studentFormSchema } from '@/components/formSchema'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { editStudent, fetchStudentByID } from '@/redux/features/student/studentActions'
import { useToast } from '@/components/ui/use-toast'

const EditStudent = () => {
    const student = useAppSelector((state) => state.studentSingle.studentData);
    const {toast} = useToast()


    const form = useForm<z.infer<typeof studentFormSchema>>({
        resolver: zodResolver(studentFormSchema),
        defaultValues: {
            name: student?.name,
            parent_name: student?.parent_name,
            email: student?.email,
            phone: student?.phone,
            time: student?.time,
            city: student?.city,
            address: "",
            grade: student?.grade,
        },
    });
      const loading = useAppSelector((state) => state.studentEdit.loading)
      const navigate = useNavigate()
      const currentDate = new Date().toLocaleString();

      const { studentId } :{ studentId?: string } = useParams(); 

      const dispatch = useAppDispatch();
  
      useEffect(() => {
        form.reset();
        dispatch(fetchStudentByID({ studentId: studentId || '' }));
    }, [dispatch, form, studentId]);

    useEffect(() => {
        if (student) {
            form.reset(student);
        }
    }, [student, form]);

      const onSubmit = async (values: z.infer<typeof studentFormSchema>) => {
        try {
          await dispatch(editStudent({studentId: studentId || '', studentData: values}));
          navigate("/students")
          toast({
            variant: "default",
            title: "Student Edited Successfully",
            description: currentDate,
          })
        } catch (error) {
          console.log("Failed to add student:", error);
        }
      }


    return(
        <DefaultLayout>
            <Breadcrumb pageName="Edit Student" />
            <div className="">
            <Form {...form}>
                <form action="" onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <div className="w-full sm:w-auto">
                        <div className="flex flex-col gap-9 rounded-lg border border-stroke bg-white shadow-default dark:bg-boxdark dark:border-boxdark">
                            <div className="border-b border-stroke rounded-lg bg-purple py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-white capitalize dark:text-white">
                                    Edit student details
                                </h3>
                            </div>
                            <div className='p-6.5'>
                                <FormField control={form.control} name='name' render={({ field })=> (
                                    <FormItem>
                                        <FormLabel className='my-2.5 block'>Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="border-stroke bg-transparent py-6 px-5 text-black dark:text-white dark:border-meta-4 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                                defaultValue={student?.name} {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                    )}/>
                                <FormField control={form.control} name="email" render={({ field })=> (
                                    <FormItem>
                                        <FormLabel className="my-4.5 block">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="border-stroke bg-transparent py-6 px- text-black dark:text-white dark:border-meta-4 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                                defaultValue={student?.email} {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                    )}/>
                                <FormField control={form.control} name="phone" render={({ field })=> (
                                    <FormItem>
                                        <FormLabel className="my-4.5 block">Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="border-stroke bg-transparent py-6 px- text-black dark:text-white dark:border-meta-4 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                                defaultValue={student?.phone} {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                    )}/>
                                <FormField control={form.control} name="grade" render={({ field })=> (
                                    <FormItem>
                                        <FormLabel className="my-4.5 block">Grade</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="border-stroke bg-transparent py-6 px- text-black dark:text-white dark:border-meta-4 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                                defaultValue={student?.grade} {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                    )}/>
                                    <div className="flex flex-row gap-5">
                                        <div className="w-full xl:w-1/2">
                                            <FormField control={form.control} name="time" render={({ field
                                                })=> (
                                                <FormItem>
                                                    <FormLabel className="my-4.5 block">Birth Date
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input type="date"
                                                            className="border-stroke bg-transparent py-6 px-9 text-black dark:text-white dark:border-meta-4 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                                            defaultValue={student?.time} {...field} />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                                )}
                                                />
                                        </div>
                                        <div className="w-full xl:w-1/2">
                                            <FormField control={form.control} name="city" render={({ field
                                                })=> (
                                                <FormItem>
                                                    <FormLabel className="my-4.5 block">Birth Place
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="border-stroke bg-transparent py-6 px-5 text-black dark:text-white dark:border-meta-4 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                                            defaultValue="Birth place" {...field} />
                                                    </FormControl>
                                                    <FormMessage className="text-red-500" />
                                                </FormItem>
                                                )}
                                                />
                                        </div>
                                    </div>
                                    <FormField control={form.control} name="address" render={({ field
                                        })=> (
                                        <FormItem>
                                            <FormLabel className="my-4.5 block">Address</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="border-stroke bg-transparent py-6 px- text-black dark:text-white dark:border-meta-4 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                                    placeholder="Address" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                        )}
                                        />
                            </div>                           
                        </div>
                    </div>
                    <div className="w-full sm:w-auto">
                        <div className="flex flex-col gap-9 rounded-lg border border-stroke bg-white shadow-default dark:bg-boxdark dark:border-boxdark">
                            <div
                                className="border-b border-stroke rounded-lg bg-purple py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-white dark:text-white">
                                    Parent Details
                                </h3>
                            </div>
                            <div className="p-6.5">
                                <FormField control={form.control} name="parent_name" render={({ field })=> (
                                    <FormItem>
                                        <FormLabel className="my-2.5 block">Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="border-stroke bg-transparent py-6 px-5 text-black dark:text-white dark:border-meta-4 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                                placeholder={student?.parent_name} {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                    )}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-4 justify-end col-span-2">
                        <Button
                            className="rounded-lg border border-purple bg-white capitalize hover:bg-slate-400 hover:text-white dark:bg-black">Save
                            as draft</Button>
                        <Button disabled={loading} type="submit"
                            className="rounded-lg text-white bg-purple capitalize">{loading ? 'Saving...' :
                            'Edit Student'}</Button>
                    </div>
                </form>
            </Form>
          </div>            
        </DefaultLayout>
    )
}

export default EditStudent