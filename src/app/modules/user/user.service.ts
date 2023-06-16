import mongoose from 'mongoose'
import { IUser } from './user.interface'
import { User } from './user.model'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'

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
    newUserData = await User.findOne({ _id: newUserData._id })
  }

  return newUserData
}

export const UserService = {
  createUser,
}
