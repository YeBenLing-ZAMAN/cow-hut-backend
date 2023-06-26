import express from 'express'
import { AdminController } from './admin.controller'
import { AdminValidation } from './admin.validation'
import { requestValidation } from '../../middleware/validationRequest'
const router = express.Router()

// router.post('/login', AdminController.adminsLogin)
router.post(
  '/create-admin',
  requestValidation.validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
)

export const AdminRoutes = router
