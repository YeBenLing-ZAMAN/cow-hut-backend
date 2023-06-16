import { ICow } from './cow.interface'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { Cow } from './cow.model'
import { IGenericResponse } from '../../../interface/error'

const createCow = async (payload: ICow): Promise<ICow | null> => {
  const result = await Cow.create(payload)
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create cow')
  }
  return result
}

const getAllCows = async (): Promise<IGenericResponse<ICow[]>> => {
  const result = await Cow.find().sort().populate('seller')
  const total = await Cow.countDocuments()
  return {
    meta: {
      page: 1,
      limit: 2,
      total,
    },
    data: result,
  }
}

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id)

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found!')
  }
  return result
}

const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const isExist = await Cow.findById(id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cow not found!')
  }
  const result = await Cow.findByIdAndUpdate(id, payload, {
    new: true, // return new document of the DB
  })
  return result
}

const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id)
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete Cow')
  }

  return result
}

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
}
