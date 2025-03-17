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
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const CheckMail_1 = require("../utils/CheckMail");
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, username, email, addresses, password } = req.body;
        if (!firstName || !lastName || !username || !email || !addresses || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        if (password.length < 8) {
            res.status(400).json({ message: "Password must be more than 8 characters" });
            return;
        }
        if (!Array.isArray(addresses) || addresses.length === 0) {
            res.status(400).json({ message: "Addresses must be a non-empty array" });
            return;
        }
        for (const address of addresses) {
            const { street, city, state, zip } = address;
            if (!street || !city || !state || !zip) {
                res.status(400).json({ message: "All address fields are required" });
                return;
            }
        }
        const findEmail = yield userModel_1.User.findOne({ email });
        const findUsername = yield userModel_1.User.findOne({ username });
        if (findEmail || findUsername) {
            res.status(401).json({ message: "User already exists" });
            return;
        }
        const isEmailValid = yield (0, CheckMail_1.checkMail)(email);
        if (isEmailValid === 'UNDELIVERABLE') {
            res.status(400).json({ message: "Invalid email address" });
            return;
        }
        const hashPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield userModel_1.User.create({
            firstName,
            lastName,
            username,
            email,
            address: addresses,
            password: hashPassword,
            position: "user"
        });
        const ACCESS_TOKEN = jsonwebtoken_1.default.sign({ userId: user._id, role: user.position }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        const REFRESH_TOKEN = jsonwebtoken_1.default.sign({ userId: user._id, role: user.position }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
        res.status(201).json({ ACCESS_TOKEN, REFRESH_TOKEN });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({ message: error.errors });
        }
        else {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
});
exports.signupUser = signupUser;
