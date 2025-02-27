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
exports.signupUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        if (!firstName || !lastName || !username || !email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        if (password.length < 8) {
            res.status(400).json({ message: "Password Must Be More Than 8" });
            return;
        }
        const findemail = yield userModel_1.User.findOne({ email });
        const findusername = yield userModel_1.User.findOne({ username });
        if (findemail || findusername) {
            res.status(401).json({ message: "User already exists" });
            return;
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield userModel_1.User.create({
            firstName,
            lastName,
            username,
            email,
            password: hashPassword,
            position: "user"
        });
        const ACCESS_TOKEN = jsonwebtoken_1.default.sign({ userId: user._id, role: user.position }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        const REFRESH_TOKEN = jsonwebtoken_1.default.sign({ userId: user._id, role: user.position }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
        res.cookie("jwt", REFRESH_TOKEN, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({ ACCESS_TOKEN });
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.signupUser = signupUser;
