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
import { addStudent } from "@/redux/features/student/studentActions"
import { studentFormSchema } from "@/components/formSchema"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"

const AddNewStudent:React.FC = () => {
  const dispatch = useAppDispatch()

  const form = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: "",
      parent_name: "",
      email: "",
      phone: "",
      time: "",
      city: "",
      address: "",
      grade: "",
    },
  })
  const loading = useAppSelector((state) => state.studentAdd.loading)
  const navigate = useNavigate()
  const {toast} = useToast()
  const currentDate = new Date().toLocaleString();

  const onSubmit = async (values: z.infer<typeof studentFormSchema>) => {
    try {
      await dispatch(addStudent(values));
      navigate("/students")
      toast({
        variant: "default",
        title: "Student Added Successfully",
        description: currentDate,
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
              <form action="" onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                  <div className="rounded-lg border border-stroke bg-white shadow-default dark:bg-boxdark dark:border-boxdark">
                    <div className="border-b border-stroke rounded-lg bg-purple py-4 px-6.5 dark:border-strokedark">
                      <h3 className="font-medium text-white dark:text-white">
                        Student Details
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

                        <FormField control={form.control} name="grade" render={({ field })=> (
                          <FormItem>
                            <FormLabel className="my-4.5 block">Grade</FormLabel>
                            <FormControl>
                              <Input
                                className="border-stroke bg-transparent py-6 px- text-black dark:text-white dark:border-meta-4 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                placeholder="Grade" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                          )}
                          />

                          <div className="flex flex-row gap-5">
                            <div className="w-full xl:w-1/2">
                              <FormField control={form.control} name="time" render={({ field })=> (
                                <FormItem>
                                  <FormLabel className="my-4.5 block">Birth Date</FormLabel>
                                  <FormControl>
                                    <Input type="date"
                                      className="border-stroke bg-transparent py-6 px-9 text-black dark:text-white dark:border-meta-4 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                      placeholder="Birthdate" {...field} />
                                  </FormControl>
                                  <FormMessage className="text-red-500" />
                                </FormItem>
                                )}
                                />
                            </div>

                            <div className="w-full xl:w-1/2">
                              <FormField control={form.control} name="city" render={({ field })=> (
                                <FormItem>
                                  <FormLabel className="my-4.5 block">Birth Place</FormLabel>
                                  <FormControl>
                                    <Input
                                      className="border-stroke bg-transparent py-6 px-5 text-black dark:text-white dark:border-meta-4 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                                      placeholder="Birth place" {...field} />
                                  </FormControl>
                                  <FormMessage className="text-red-500" />
                                </FormItem>
                                )}
                                />
                            </div>
                          </div>
                          <FormField control={form.control} name="address" render={({ field })=> (
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

                <div className="flex flex-col gap-9">
                  <div className="rounded-lg border border-stroke bg-white shadow-default dark:bg-boxdark dark:border-boxdark">
                    <div className="border-b border-stroke rounded-lg bg-purple py-4 px-6.5 dark:border-strokedark">
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
                                  placeholder="Name" {...field} />
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
                  <Button disabled={loading} type="submit" className="rounded-lg text-white bg-purple capitalize">{loading ? 'Saving...' : 'Save Student'}</Button>
                </div>
              </form>

            </Form>
          </div>            
        </DefaultLayout>
    )
}

export default AddNewStudent