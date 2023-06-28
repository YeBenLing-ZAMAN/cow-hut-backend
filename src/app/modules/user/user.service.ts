/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import { IUser } from './user.interface'
import { User } from './user.model'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IGenericResponse } from '../../../interface/error'
import { Cow } from '../cow/cow.model'
import config from '../../../config'
import bcrypt from 'bcrypt'

const createUser = async (user: IUser): Promise<IUser | null> => {
  let newUserData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserData = newUser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  if (newUserData) {
    newUserData = await User.findOne({ _id: newUserData._id }).select({
      password: 0,
    })
  }

  return newUserData
}

const getAllUsers = async (): Promise<IGenericResponse<IUser[]>> => {
  const result = await User.find().sort()
  const total = await User.countDocuments()
  return {
    meta: {
      page: 1,
      limit: 2,
      total,
    },
    data: result,
  }
}

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')
  }
  return result
}

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findById(id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')
  }

  const { name, ...userData } = payload
  const updatedStudentData: Partial<IUser> = { ...userData }
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>
      ;(updatedStudentData as any)[nameKey] = name[key as keyof typeof name]
    })
  }
  const result = await User.findByIdAndUpdate(id, updatedStudentData, {
    new: true, // return new document of the DB
  })
  return result
}

const deleteUser = async (id: string): Promise<IUser | null> => {
  let deleteUser = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const isExist = await User.findById(id)
    if (!isExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')
    }

    const deletedCow = await Cow.deleteMany({ seller: id }, { session })
    if (!deletedCow) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete cows')
    }

    deleteUser = await User.findByIdAndDelete(id, { session })
    if (!deleteUser) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  return deleteUser
}

const getMyProfile = async (requestedUser: any): Promise<IUser | null> => {
  const result = await User.findById(requestedUser._id).select('-password')

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')
  }
  return result
}

const updateMyProfile = async (
  requestedUser: any,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findById(requestedUser._id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!')
  }

  const { name, password, ...userData } = payload
  const updatedStudentData: Partial<IUser> = { ...userData }
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>
      ;(updatedStudentData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  if (password) {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(config.bcrypt_salt_rounds)
    )
    updatedStudentData.password = hashedPassword
  }

  const result = await User.findByIdAndUpdate(
    requestedUser._id,
    updatedStudentData,
    {
      new: true, // return new document of the DB
    }
  ).select('-password')
  return result
}

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
}
