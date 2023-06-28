"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const admin_validation_1 = require("./admin.validation");
const validationRequest_1 = require("../../middleware/validationRequest");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../enums/user");
const router = express_1.default.Router();
// router.post('/login', AdminController.adminsLogin)
router.post('/create-admin', validationRequest_1.requestValidation.validateRequest(admin_validation_1.AdminValidation.createAdminZodSchema), admin_controller_1.AdminController.createAdmin);
router.post('/login', validationRequest_1.requestValidation.validateRequest(admin_validation_1.AdminValidation.loginAdminZodSchema), admin_controller_1.AdminController.adminLogin);
router.get('/my-profile', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.getAdminProfile);
router.patch('/my-profile', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), validationRequest_1.requestValidation.validateRequest(admin_validation_1.AdminValidation.AdminProfileZodSchema), admin_controller_1.AdminController.updateAdminProfile);
exports.AdminRoutes = router;
