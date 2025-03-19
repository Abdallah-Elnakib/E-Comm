"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID,
};
let app;
let db;
if (!(0, app_1.getApps)().length) {
    app = (0, app_1.initializeApp)(firebaseConfig);
    exports.db = db = (0, firestore_1.getFirestore)(app);
}
else {
    app = (0, app_1.getApps)()[0];
    exports.db = db = (0, firestore_1.getFirestore)(app);
}
console.log("Firebase Connected.........");
