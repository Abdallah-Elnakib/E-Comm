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
exports.resetPassword = void 0;
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.query;
        const { newassword, confirmpassword } = req.body;
        if (!token || !newassword || !confirmpassword) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        if (newassword !== confirmpassword) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }
        const user = yield userModel_1.User.findOne({ resetPasswordToken: token });
        if (!user) {
            res.status(400).json({ message: "Invalid token" });
            return;
        }
        jsonwebtoken_1.default.verify(user.resetPasswordToken, process.env.RESET_PASSWORD_SECRET, (err, decoded) => {
            if (err) {
                res.status(400).json({ message: "Invalid token" });
                return;
            }
        });
        const hashPassword = yield bcrypt_1.default.hash(newassword, 10);
        user.password = hashPassword;
        user.resetPasswordToken = undefined;
        yield user.save();
        res.status(200).json({ message: "Password reset successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.resetPassword = resetPassword;
