import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { CowService } from './cow.service'

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cow } = req.body
  const result = await CowService.createCow(cow)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'cow created successfully!',
    data: result,
  })
})

export const CowController = {
  createCow,
}
