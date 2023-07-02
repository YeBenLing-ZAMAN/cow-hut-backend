'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.AdminValidation = void 0
const zod_1 = require('zod')
const admin_constants_1 = require('./admin.constants')
const createAdminZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    name: zod_1.z.object({
      firstName: zod_1.z.string({
        required_error: 'First name is required',
      }),
      lastName: zod_1.z.string({
        required_error: 'Last name is required',
      }),
    }),
    phoneNumber: zod_1.z.string({
      required_error: 'Phone Number is required',
    }),
    password: zod_1.z.string({
      required_error: 'password is required',
    }),
    address: zod_1.z.string({
      required_error: 'Present address is required',
    }),
  }),
})
const loginAdminZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    phoneNumber: zod_1.z.string({
      required_error: 'Phone Number is required',
    }),
    password: zod_1.z.string({
      required_error: 'password is required',
    }),
  }),
})
const AdminProfileZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    password: zod_1.z.string().optional(),
    name: zod_1.z
      .object({
        firstName: zod_1.z
          .string({
            required_error: 'First name is required',
          })
          .optional(),
        lastName: zod_1.z
          .string({
            required_error: 'Last name is required',
          })
          .optional(),
      })
      .optional(),
    role: zod_1.z
      .enum([...admin_constants_1.role], {
        required_error: 'User role is required',
      })
      .optional(),
    address: zod_1.z
      .string({
        required_error: 'Address is required',
      })
      .optional(),
    budget: zod_1.z
      .number({
        required_error: 'Budget  is required',
      })
      .optional(),
    income: zod_1.z
      .number({
        required_error: 'Income is required',
      })
      .optional(),
  }),
})
exports.AdminValidation = {
  createAdminZodSchema,
  loginAdminZodSchema,
  AdminProfileZodSchema,
}
