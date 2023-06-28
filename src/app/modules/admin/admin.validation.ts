import { z } from 'zod'
import { role } from './admin.constants'

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

const AdminProfileZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    name: z
      .object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .optional(),
      })
      .optional(),
    role: z
      .enum([...role] as [string, ...string[]], {
        required_error: 'User role is required',
      })
      .optional(),
    address: z
      .string({
        required_error: 'Address is required',
      })
      .optional(),
    budget: z
      .number({
        required_error: 'Budget  is required',
      })
      .optional(),
    income: z
      .number({
        required_error: 'Income is required',
      })
      .optional(),
  }),
})

export const AdminValidation = {
  createAdminZodSchema,
  loginAdminZodSchema,
  AdminProfileZodSchema,
}
