import { Model } from 'mongoose'

export type UserName = {
  firstName: string
  lastName: string
}

export type IUser = {
  role: 'seller' | 'buyer' | 'admin'
  phoneNumber: string
  password: string
  name: UserName
  gender: 'male' | 'female'
  address: string
  budget: number
  income: number
}

export type UserModel = Model<IUser, Record<string, unknown>>
