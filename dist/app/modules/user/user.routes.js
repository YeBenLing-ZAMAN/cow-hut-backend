'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.UserRoutes = void 0
const express_1 = __importDefault(require('express'))
const user_controllers_1 = require('./user.controllers')
const user_validation_1 = require('./user.validation')
const validationRequest_1 = require('../../middleware/validationRequest')
const user_1 = require('../../enums/user')
const auth_1 = __importDefault(require('../../middleware/auth'))
const router = express_1.default.Router()
router.post(
  '/user-create',
  validationRequest_1.requestValidation.validateRequest(
    user_validation_1.UserValidation.createUserZodSchema
  ),
  user_controllers_1.UserController.createUser
)
router.get(
  '/',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  user_controllers_1.UserController.getAllUsers
)
router.get(
  '/my-profile',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.BUYER,
    user_1.ENUM_USER_ROLE.SELLER
  ),
  user_controllers_1.UserController.getMyProfile
)
router.patch(
  '/my-profile',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.BUYER,
    user_1.ENUM_USER_ROLE.SELLER
  ),
  validationRequest_1.requestValidation.validateRequest(
    user_validation_1.UserValidation.updateUserZodSchema
  ),
  user_controllers_1.UserController.updateMyProfile
)
router.get(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  user_controllers_1.UserController.getSingleUser
)
router.delete(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  user_controllers_1.UserController.deleteUser
)
router.patch(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  validationRequest_1.requestValidation.validateRequest(
    user_validation_1.UserValidation.updateUserZodSchema
  ),
  user_controllers_1.UserController.updateUser
)
exports.UserRoutes = router
