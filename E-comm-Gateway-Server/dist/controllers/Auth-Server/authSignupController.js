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
exports.signupUser = void 0;
const FetchAnotherServer_1 = require("../../utils/FetchAnotherServer");
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, username, email, addresses, password } = req.body;
        if (!firstName || !lastName || !username || !email || !addresses || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const data = {
            firstName,
            lastName,
            username,
            email,
            addresses,
            password
        };
        const response = yield (0, FetchAnotherServer_1.fetchAnotherServer)(`${process.env.AUTHSERVER}/api/auth/signup`, 'POST', data);
        if ('status' in response) {
            const responseData = yield response.json();
            req.session.refreshToken = responseData.REFRESH_TOKEN;
            res.status(response.status).json({ "Access Token": responseData.ACCESS_TOKEN });
        }
        else {
            res.status(500).json({ message: "Error from auth server" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.signupUser = signupUser;
