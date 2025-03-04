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
exports.checkUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.session) === null || _a === void 0 ? void 0 : _a.refreshToken;
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            if (decoded && typeof decoded === 'object' && 'userInfo' in decoded) {
                res.status(200).json({ message: decoded.userInfo });
            }
            else {
                res.status(401).json({ message: "Unauthorized" });
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.checkUser = checkUser;
