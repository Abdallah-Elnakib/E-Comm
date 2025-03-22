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
exports.checkRequestAuthentication = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const checkRequestAuthentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`${req.protocol}://${req.get('host')}`);
    try {
        if (req.headers.username === process.env.CHECK_REQUEST_AUTHENTICATION_USERNAME && req.headers.password === process.env.CHECK_REQUEST_AUTHENTICATION_PASSWORD) {
            next();
        }
        else if (`${req.protocol}://${req.get('host')}` === process.env.ENDPOINTAUTH) {
            next();
        }
        else {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
});
exports.checkRequestAuthentication = checkRequestAuthentication;
