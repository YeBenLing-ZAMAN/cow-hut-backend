/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { IAdmin } from './admin.interface'
import { Admin } from './admin.model'

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

export const AdminService = {
  createAdmin,
}
