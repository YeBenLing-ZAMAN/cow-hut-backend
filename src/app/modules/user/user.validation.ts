import { z } from 'zod'
import { gender, role } from './user.constants'

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    role: z.enum([...role] as [string, ...string[]], {
      required_error: 'User role is required',
    }),
    gender: z.enum([...gender] as [string, ...string[]], {
      required_error: 'Gender is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    budget: z.number({
      required_error: 'Budget  is required',
    }),
    income: z.number({
      required_error: 'Income is required',
    }),
  }),
})

export const UserValidation = {
  createUserZodSchema,
}
