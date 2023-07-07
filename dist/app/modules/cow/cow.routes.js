'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.CowRoutes = void 0
const express_1 = __importDefault(require('express'))
const cow_controllers_1 = require('./cow.controllers')
const cow_validation_1 = require('./cow.validation')
const validationRequest_1 = require('../../middleware/validationRequest')
const auth_1 = __importDefault(require('../../middleware/auth'))
const user_1 = require('../../enums/user')
const router = express_1.default.Router()
router.post(
  '/',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.SELLER),
  validationRequest_1.requestValidation.validateRequest(
    cow_validation_1.CowValidation.createCowZodSchema
  ),
  cow_controllers_1.CowController.createCow
)
router.get(
  '/',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SELLER,
    user_1.ENUM_USER_ROLE.BUYER,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  cow_controllers_1.CowController.getAllCows
)
router.get(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SELLER,
    user_1.ENUM_USER_ROLE.BUYER,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  cow_controllers_1.CowController.getSingleCow
)
router.delete(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.SELLER),
  cow_controllers_1.CowController.deleteCow
)
router.patch(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.SELLER),
  validationRequest_1.requestValidation.validateRequest(
    cow_validation_1.CowValidation.updateCowZodSchema
  ),
  cow_controllers_1.CowController.updateCow
)
exports.CowRoutes = router
