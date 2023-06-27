import express from 'express'
import { CowController } from './cow.controllers'
import { CowValidation } from './cow.validation'
import { requestValidation } from '../../middleware/validationRequest'
import auth from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../enums/user'
const router = express.Router()

router.post(
  '/cow-create',
  auth(ENUM_USER_ROLE.SELLER),
  requestValidation.validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow
)

router.get(
  '/',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  CowController.getAllCows
)
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  CowController.getSingleCow
)
router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow)
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER),
  requestValidation.validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
)

export const CowRoutes = router
