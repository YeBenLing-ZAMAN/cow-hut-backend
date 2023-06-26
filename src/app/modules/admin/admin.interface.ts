import { Model } from 'mongoose'

export type UserName = {
  firstName: string
  lastName: string
}

export type IAdmin = {
  phoneNumber: string
  role: string
  name: UserName //embedded object
  password: string
  address: string
}

export type AdminModel = Model<IAdmin, Record<string, unknown>>
