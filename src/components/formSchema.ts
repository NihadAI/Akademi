import { z } from "zod";

export const studentFormSchema = z.object({
    name: z.string().min(3,{
      message: "First name must be at least 3 characters."
    }).max(50),
    parent_name: z.string().min(3,{
      message: "First name must be at least 3 characters."
    }).max(50),
    email: z.string().email().min(10,{
      message: "Invalid email."
    }),
    phone: z.string().refine((value) => /^\d{10}$/i.test(value), {
      message: "Invalid phone number. Phone number must be 10 digits long and contain only digits.",
    }),
    time: z.string().refine((date) => {return date.trim() !== "" && !isNaN(Date.parse(date));}, {
      message: "Invalid Birth date"
    }),
    city: z.string().min(4, {
      message: "Birth place must at least be 4 chracters"
    }),
    address: z.string().min(5, {
      message: "Invalid address.",
    }),
    grade: z.string().refine(value => /^(?:[1-9]|1[0-1])$/.test(value), {
      message: 'Grade must be between 1 and 11'
    })
  })

export const teacherFormSchema = z.object({
    name: z.string().min(3,{
      message: "First name must be at least 3 characters."
    }).max(50),
    position: z.string().min(3, {
      message: "Invalid position."
    }),
    email: z.string().email().min(10,{
      message: "Invalid email."
    }),
    phone: z.string().refine((value) => /^\d{10}$/i.test(value), {
      message: "Invalid phone number. Phone number must be 10 digits long and contain only digits.",
    })
  })
  