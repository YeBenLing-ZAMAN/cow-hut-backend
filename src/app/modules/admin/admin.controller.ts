import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { AdminService } from './admin.service'
import config from '../../../config'
import { IAdminLoginResponse } from './admin.interface'

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...admin } = req.body
  const result = await AdminService.createAdmin(admin)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  })
})

const adminLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await AdminService.adminLogin(loginData)
  const { refreshToken, ...others } = result
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<IAdminLoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin login successfully!',
    data: others,
  })
})

export const AdminController = {
  createAdmin,
  adminLogin,
}
