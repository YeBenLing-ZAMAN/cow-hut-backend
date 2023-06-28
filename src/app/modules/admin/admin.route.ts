import express from 'express'
import { AdminController } from './admin.controller'
import { AdminValidation } from './admin.validation'
import { requestValidation } from '../../middleware/validationRequest'
import auth from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../enums/user'
const router = express.Router()

// router.post('/login', AdminController.adminsLogin)
router.post(
  '/create-admin',
  requestValidation.validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
)
router.post(
  '/login',
  requestValidation.validateRequest(AdminValidation.loginAdminZodSchema),
  AdminController.adminLogin
)

router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.getAdminProfile
)

router.patch(
  '/my-profile',
  auth(ENUM_USER_ROLE.ADMIN),
  requestValidation.validateRequest(AdminValidation.AdminProfileZodSchema),
  AdminController.updateAdminProfile
)

export const AdminRoutes = router
