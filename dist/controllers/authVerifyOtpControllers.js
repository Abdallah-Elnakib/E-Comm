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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = void 0;
const otpSchema_1 = require("../models/otpSchema");
const CheckMail_1 = require("../utils/CheckMail");
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            res.status(400).json({ message: "Email and OTP are required" });
            return;
        }
        const isEmailValid = yield (0, CheckMail_1.checkMail)(email);
        if (isEmailValid === 'UNDELIVERABLE') {
            res.status(400).json({ message: "Invalid email address" });
            return;
        }
        const CheckOtpInDB = yield otpSchema_1.Otp.findOne({ email });
        if (!CheckOtpInDB) {
            res.status(400).json({ message: "OTP not found" });
            return;
        }
        if (CheckOtpInDB.otp !== otp) {
            res.status(400).json({ message: "Invalid OTP" });
            return;
        }
        res.status(200).json({ message: "OTP verified successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.verifyOtp = verifyOtp;
