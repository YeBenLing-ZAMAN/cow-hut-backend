"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validationRequest_1 = require("../../middleware/validationRequest");
const user_validation_1 = require("../user/user.validation");
const user_controllers_1 = require("../user/user.controllers");
const router = express_1.default.Router();
router.post('/signup', validationRequest_1.requestValidation.validateRequest(user_validation_1.UserValidation.createUserZodSchema), user_controllers_1.UserController.createUser);
exports.AuthRoutes = router;
