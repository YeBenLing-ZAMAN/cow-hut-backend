import { Schema, model } from 'mongoose'
import { AdminModel, IAdmin } from './admin.interface'
import config from '../../../config'
import bcrypt from 'bcrypt'

export const AdminSchema = new Schema<IAdmin, AdminModel>(
  {
    phoneNumber: { type: String, unique: true, required: true },
    role: { type: String, enum: ['admin'], required: true },
    password: { type: String, required: true },
    name: {
      type: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
    },
    address: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

AdminSchema.pre('save', async function (next) {
  //hashing user password.
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

AdminSchema.methods.isAdminExist = async function (
  phoneNumber: string
): Promise<Partial<IAdmin> | null> {
  const admin = await Admin.findOne(
    { phoneNumber },
    { id: 1, password: 1, role: 1 }
  ).lean()
  return admin
}

AdminSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isMatched = await bcrypt.compare(givenPassword, savedPassword)
  return isMatched
}

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema)
