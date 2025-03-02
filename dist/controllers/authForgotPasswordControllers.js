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
exports.forgotPassword = void 0;
const userModel_1 = require("../models/userModel");
const mailSender_1 = __importDefault(require("../utils/mailSender"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function sendVerificationEmail(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}`;
            const mailResponse = yield (0, mailSender_1.default)(email, "Reset Password", `<h1>Reset Your Password</h1>
       <p>Click the button below to reset your password:</p>
       <a href="${resetPasswordUrl}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: blue; text-decoration: none; border-radius: 5px;">Reset Password</a>`);
        }
        catch (error) {
            console.log("Error occurred while sending email: ", error);
            throw error;
        }
    });
}
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ message: "Email is required" });
            return;
        }
        const user = yield userModel_1.User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Email not found" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.RESET_PASSWORD_SECRET, { expiresIn: '1h' });
        yield userModel_1.User.updateOne({ email }, { $set: { resetPasswordToken: token } });
        yield sendVerificationEmail(email, token);
        res.status(200).json({ message: "Reset password email sent successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.forgotPassword = forgotPassword;
