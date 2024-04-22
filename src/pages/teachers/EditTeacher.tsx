import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"
import { Button } from "@/components/ui/button"
import DefaultLayout from "@/layout/DefaultLayout"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { editTeacher, fetchTeacherByID } from "@/redux/features/teacher/teacherActions"
import { useNavigate, useParams } from "react-router-dom"
import { teacherFormSchema } from "@/components/formSchema"
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react"

const EditTeacher:React.FC = () => {
  const { teacherId } :{ teacherId?: string } = useParams();
  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.teacherEdit.loading)
  const teacher = useAppSelector((state) => state.teacherSingle.teacherData)
  const navigate = useNavigate()
  const { toast } = useToast()
  const currentDate = new Date().toLocaleString();
  
  const form = useForm<z.infer<typeof teacherFormSchema>>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      name: teacher?.name,
      email: teacher?.email,
      phone: teacher?.phone,
      position: teacher?.position
    },
  })

  useEffect(() => {
    form.reset()
    dispatch(fetchTeacherByID({teacherId: teacherId || ""}))
}, [dispatch, teacherId, form]);

useEffect(() => {
  if (teacher) {
    form.reset(teacher)
  }

}, [form, teacher])


  const onSubmit = async (values: z.infer<typeof teacherFormSchema>) => {
    try {
      await dispatch(editTeacher({teacherId: teacherId || "", teacherData: values}));
      navigate("/teachers")
      toast({
        variant: "default",
        title: "Teacher Edited Successfully",
        description: currentDate
      })
    } catch (error) {
      console.log("Failed to add student:", error);
    }
  }

    return(
    <DefaultLayout>
        <Breadcrumb pageName="Edit Teacher" />
        <div className="">
            <Form {...form}>
                <form action="" onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <div className="flex flex-col gap-9">
                        <div className="rounded-lg border border-stroke bg-white shadow-default dark:bg-boxdark dark:border-boxdark">
                            <div
                                className="border-b border-stroke rounded-lg bg-purple py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-white dark:text-white">
                                    Peronal Details
                                </h3>
                            </div>
                            <div className="p-6.5">
                                <FormField control={form.control} name="name" render={({ field })=> (
                                    <FormItem>
                                        <FormLabel className="my-2.5 block">Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="border-stroke dark:border-meta-4 bg-transparent py-6 px-5 text-black dark:text-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                                placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                    )}
                                    />

                                    <FormField control={form.control} name="email" render={({ field })=> (
                                        <FormItem>
                                            <FormLabel className="my-4.5 block">Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="border-stroke dark:border-meta-4 bg-transparent py-6 px- text-black dark:text-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                                    placeholder="Email" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                        )}
                                        />
                                        <FormField control={form.control} name="phone" render={({ field })=> (
                                            <FormItem>
                                                <FormLabel className="my-4.5 block">Phone</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="border-stroke dark:border-meta-4 bg-transparent py-6 px- text-black dark:text-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                                        placeholder="Phone" {...field} />
                                                </FormControl>
                                                <FormMessage className="text-red-500" />
                                            </FormItem>
                                            )}
                                        />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-9">
                        <div className="rounded-lg border border-stroke dark:border-meta-4 bg-white shadow-default dark:bg-boxdark">
                            <div
                                className="border-b border-stroke rounded-lg bg-purple py-4 px-6.5 dark:border-strokedark">
                                <h3 className="font-medium text-white dark:text-white">
                                    Education
                                </h3>
                            </div>
                            <div className="p-6.5">
                                        <FormField control={form.control} name="position" render={({ field })=> (
                                            <FormItem>
                                                <FormLabel className="my-4.5 block">Position</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className="border-stroke dark:border-meta-4 bg-transparent py-6 px- text-black dark:text-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                                        placeholder="Position" {...field} />
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
                        <Button disabled={loading} type="submit" className="rounded-lg text-white bg-purple capitalize">{loading ? 'Saving...' : "Edit Teacher"}</Button>
                    </div>
                </form>

            </Form>
        </div>
    </DefaultLayout>
    )
}

export default EditTeacher