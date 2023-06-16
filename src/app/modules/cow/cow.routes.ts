import express from 'express'
import { CowController } from './cow.controllers'
import { CowValidation } from './cow.validation'
import { requestValidation } from '../../middleware/validationRequest'
const router = express.Router()

router.post(
  '/cow-create',
  requestValidation.validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow
)

export const CowRoutes = router
