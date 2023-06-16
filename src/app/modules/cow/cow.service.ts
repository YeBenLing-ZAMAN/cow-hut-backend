import { ICow } from './cow.interface'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { Cow } from './cow.model'

const createCow = async (payload: ICow): Promise<ICow | null> => {
  const result = await Cow.create(payload)
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create cow')
  }
  return result
}

export const CowService = {
  createCow,
}
