/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { IAdmin, IAdminLogin, IAdminLoginResponse } from './admin.interface'
import { Admin } from './admin.model'
import { jwtHelpers } from '../../../helpers/jwtHelper'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'

const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  let newAdminData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    admin.role = 'admin'
    const newAdmin = await Admin.create([admin], { session })
    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    newAdminData = newAdmin[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  if (newAdminData) {
    newAdminData = await Admin.findOne({ _id: newAdminData._id }).select({
      password: 0,
    })
  }

  return newAdminData
}

const adminLogin = async (
  payload: IAdminLogin
): Promise<IAdminLoginResponse> => {
  const { phoneNumber, password } = payload

  const admin = new Admin() // creating instance of a admin.

  // checking user by custom our created instance methods
  const isAdminExist = await admin.isAdminExist(phoneNumber)
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'admin does not exist')
  }

  // isMatching password
  const isPasswordMatch =
    isAdminExist.password &&
    (await admin.isPasswordMatch(password, isAdminExist.password))
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password is incorrect')
  }

  const { _id, role } = isAdminExist
  // create JWT token
  const accessToken = jwtHelpers.createToken(
    {
      _id,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expiries_in as string
  )

  // created refresh token
  const refreshToken = jwtHelpers.createToken(
    {
      _id,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expiries_in as string
  )
  return {
    accessToken,
    refreshToken,
  }
}

export const AdminService = {
  createAdmin,
  adminLogin,
}
