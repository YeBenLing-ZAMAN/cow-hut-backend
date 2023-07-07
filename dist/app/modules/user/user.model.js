"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_constants_1 = require("./user.constants");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const UserSchema = new mongoose_1.Schema({
    role: { type: String, enum: ['seller', 'buyer'], required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, unique: true, required: true },
    name: {
        type: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
        },
    },
    gender: { type: String, enum: user_constants_1.gender },
    address: { type: String },
    budget: { type: Number },
    income: { type: Number },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //hashing user password.
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
UserSchema.methods.isUserExist = function (phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ phoneNumber }, { id: 1, password: 1, role: 1 }).lean();
        return user;
    });
};
UserSchema.methods.isUserExistByID = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findById(id, { id: 1, password: 1, role: 1 }).lean();
        return user;
    });
};
UserSchema.methods.isPasswordMatch = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const isMatched = yield bcrypt_1.default.compare(givenPassword, savedPassword);
        return isMatched;
    });
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
