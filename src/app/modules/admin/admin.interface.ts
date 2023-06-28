import { Model } from 'mongoose'

export type UserName = {
  firstName: string
  lastName: string
}

export type IAdmin = {
  _id: string
  phoneNumber: string
  role: 'admin'
  name: UserName //embedded object
  password: string
  address: string
}

export type IAdminMethods = {
  isAdminExist(id: string): Promise<Partial<IAdmin> | null>
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
}

export type AdminModel = Model<IAdmin, Record<string, unknown>, IAdminMethods>

export type IAdminLogin = {
  phoneNumber: string
  password: string
}

export type IAdminLoginResponse = {
  accessToken: string
  refreshToken?: string
}
