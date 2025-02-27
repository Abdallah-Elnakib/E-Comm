"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authLoginControllers_1 = require("../controllers/authLoginControllers");
const authSignupController_1 = require("../controllers/authSignupController");
const router = express_1.default.Router();
router.post('/login', authLoginControllers_1.loginUser);
router.post('/signup', authSignupController_1.signupUser);
exports.default = router;
