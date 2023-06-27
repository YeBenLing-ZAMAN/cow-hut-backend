import express from 'express'
import { UserController } from './user.controllers'
import { UserValidation } from './user.validation'
import { requestValidation } from '../../middleware/validationRequest'
import { ENUM_USER_ROLE } from '../../enums/user'
import auth from '../../middleware/auth'
const router = express.Router()

router.post(
  '/user-create',
  requestValidation.validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
)
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers)
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser)
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser)
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  requestValidation.validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
)
export const UserRoutes = router
