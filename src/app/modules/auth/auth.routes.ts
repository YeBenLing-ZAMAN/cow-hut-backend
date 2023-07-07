import express from 'express'
import { requestValidation } from '../../middleware/validationRequest'
import { UserValidation } from '../user/user.validation'
import { UserController } from '../user/user.controllers'
const router = express.Router()

router.post(
  '/signup',
  requestValidation.validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
)
export const AuthRoutes = router
