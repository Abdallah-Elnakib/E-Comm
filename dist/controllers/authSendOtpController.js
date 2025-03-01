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
exports.sendOtp = void 0;
const otpSchema_1 = require("../models/otpSchema");
const mailSender_1 = __importDefault(require("../utils/mailSender"));
const CheckMail_1 = require("../utils/CheckMail");
function sendVerificationEmail(email, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mailResponse = yield (0, mailSender_1.default)(email, "Verification Email", `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`);
            console.log("Email sent successfully: ", mailResponse);
        }
        catch (error) {
            console.log("Error occurred while sending email: ", error);
            throw error;
        }
    });
}
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ message: "Email is required" });
            return;
        }
        const isEmailValid = yield (0, CheckMail_1.checkMail)(email);
        if (isEmailValid === 'UNDELIVERABLE') {
            res.status(400).json({ message: "Invalid email address" });
            return;
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpDocument = new otpSchema_1.Otp({ email, otp });
        yield otpDocument.save();
        yield sendVerificationEmail(email, otp);
        res.status(200).json({ message: "OTP sent successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.sendOtp = sendOtp;
