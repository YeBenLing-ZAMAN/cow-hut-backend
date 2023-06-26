import { z } from 'zod'

const createAdminZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    phoneNumber: z.string({
      required_error: 'Phone Number is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    address: z.string({
      required_error: 'Present address is required',
    }),
  }),
})

const loginAdminZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone Number is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
})

export const AdminValidation = {
  createAdminZodSchema,
  loginAdminZodSchema,
}
