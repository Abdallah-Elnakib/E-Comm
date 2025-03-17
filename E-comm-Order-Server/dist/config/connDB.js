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
exports.connDB = void 0;
const app_1 = require("firebase/app");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const firebaseConfig = {
        apiKey: process.env.APIKEY,
        authDomain: process.env.AUTHDOMAIN,
        projectId: process.env.PROJECTID,
        storageBucket: process.env.STORAGEBUCKET,
        messagingSenderId: process.env.MESSAGINGSENDERID,
        appId: process.env.APPID,
        measurementId: process.env.MEASUREMENTID
    };
    let app;
    if (!(0, app_1.getApps)().length) {
        app = (0, app_1.initializeApp)(firebaseConfig);
    }
    else {
        app = (0, app_1.getApps)()[0];
    }
    console.log("DataBase Firebase Connected.........");
    return app;
});
exports.connDB = connDB;
