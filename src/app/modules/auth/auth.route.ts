import express from 'express'
import { requestValidation } from '../../middleware/validationRequest'
import { AuthValidation } from './auth.validation'
import { AuthController } from './auth.controller'
const router = express.Router()

router.post(
  '/login',
  requestValidation.validateRequest(AuthValidation.loginZodSchema),
  AuthController.login
)

router.post(
  '/refresh-token',
  // requestValidation.validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
)

// router.get("/get-all-user", AuthController.getAllUser);

export const AuthRoutes = router
