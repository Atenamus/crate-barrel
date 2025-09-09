import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  password: z.string().min(8, { message: "Password should be minimum 8 characters long" }),
  address: z.string()
})

export const loginSchema = z.object({
  email: z.email(),
  password: z.string()
})

export type createUserType = z.infer<typeof createUserSchema>
export type loginUserType = z.infer<typeof loginSchema>
