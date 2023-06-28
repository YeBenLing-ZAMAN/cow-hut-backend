"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const admin_model_1 = require("./admin.model");
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const config_1 = __importDefault(require("../../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createAdmin = (admin) => __awaiter(void 0, void 0, void 0, function* () {
    let newAdminData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        admin.role = 'admin';
        const newAdmin = yield admin_model_1.Admin.create([admin], { session });
        if (!newAdmin.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        newAdminData = newAdmin[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newAdminData) {
        newAdminData = yield admin_model_1.Admin.findOne({ _id: newAdminData._id }).select({
            password: 0,
        });
    }
    return newAdminData;
});
const adminLogin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const admin = new admin_model_1.Admin(); // creating instance of a admin.
    // checking user by custom our created instance methods
    const isAdminExist = yield admin.isAdminExist(phoneNumber);
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'admin does not exist');
    }
    // isMatching password
    const isPasswordMatch = isAdminExist.password &&
        (yield admin.isPasswordMatch(password, isAdminExist.password));
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Password is incorrect');
    }
    const { _id, role } = isAdminExist;
    // create JWT token
    const accessToken = jwtHelper_1.jwtHelpers.createToken({
        _id,
        role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expiries_in);
    // created refresh token
    const refreshToken = jwtHelper_1.jwtHelpers.createToken({
        _id,
        role,
    }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expiries_in);
    return {
        accessToken,
        refreshToken,
    };
});
const getAdminProfile = (requestedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findById(requestedUser._id).select('-password');
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    return result;
});
const updateAdminProfile = (requestedUser, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield admin_model_1.Admin.findById(requestedUser._id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    const { name, password } = payload, userData = __rest(payload, ["name", "password"]);
    const updatedStudentData = Object.assign({}, userData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updatedStudentData[nameKey] = name[key];
        });
    }
    if (password) {
        const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_salt_rounds));
        updatedStudentData.password = hashedPassword;
    }
    const result = yield admin_model_1.Admin.findByIdAndUpdate(requestedUser._id, updatedStudentData, {
        new: true, // return new document of the DB
    }).select('-password');
    return result;
});
exports.AdminService = {
    createAdmin,
    adminLogin,
    getAdminProfile,
    updateAdminProfile,
};
