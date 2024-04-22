/* eslint-disable @typescript-eslint/no-unused-vars */
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb"
import { Button } from "@/components/ui/button"
import DefaultLayout from "@/layout/DefaultLayout"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { addTeacher } from "@/redux/features/teacher/teacherActions"
import { useNavigate } from "react-router-dom"
import { teacherFormSchema } from "@/components/formSchema"
import { useToast } from "@/components/ui/use-toast"

const AddNewTeacher:React.FC = () => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.teacherAdd.loading)
  const navigate = useNavigate()
  const { toast } = useToast()
  const currentDate = new Date().toLocaleString();

  const form = useForm<z.infer<typeof teacherFormSchema>>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof teacherFormSchema>) => {
    try {
      await dispatch(addTeacher(values));
      navigate("/teachers")
      toast({
        variant: "default",
        title: "Teacher Added Successfully",
        description: currentDate
      })
    } catch (error) {
      console.log("Failed to add student:", error);
    }
  }

    return(
    <DefaultLayout>
        <Breadcrumb pageName="Add Student" />
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
                                                className="border-stroke bg-transparent py-6 px-5 text-black dark:text-white dark:border-meta-4 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
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
                                                    className="border-stroke bg-transparent py-6 px- text-black dark:text-white dark:border-meta-4 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
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
                                                        className="border-stroke bg-transparent py-6 px- text-black dark:text-white dark:border-meta-4 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
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
                        <div className="rounded-lg border border-stroke bg-white shadow-default dark:bg-boxdark dark:border-boxdark">
                            <div
                                className="border-b border-stroke rounded-lg bg-purple py-4 px-6.5 dark:border-strokedark ">
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
                                                        className="border-stroke bg-transparent py-6 px- text-black dark:text-white dark:border-meta-4 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
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
                        <Button disabled={loading} type="submit" className="rounded-lg text-white bg-purple capitalize">{loading ? 'Saving...' : "Save Teacher"}</Button>
                    </div>
                </form>

            </Form>
        </div>
    </DefaultLayout>
    )
}

export default AddNewTeacher