"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authLoginControllers_1 = require("../controllers/authLoginControllers");
const authSignupController_1 = require("../controllers/authSignupController");
const authGetUserByIdControllers_1 = require("../controllers/authGetUserByIdControllers");
const authGetAllAddressController_1 = require("../controllers/authGetAllAddressController");
const authDeleteAddressByAddressNumberControllers_1 = require("../controllers/authDeleteAddressByAddressNumberControllers");
const authAddNewAddressController_1 = require("../controllers/authAddNewAddressController");
const authUpdateAddressByIdControllers_1 = require("../controllers/authUpdateAddressByIdControllers");
const authLogoutControllers_1 = require("../controllers/authLogoutControllers");
const authSendOtpController_1 = require("../controllers/authSendOtpController");
const authResendOtpControllers_1 = require("../controllers/authResendOtpControllers");
const authVerifyOtpControllers_1 = require("../controllers/authVerifyOtpControllers");
const authForgotPasswordControllers_1 = require("../controllers/authForgotPasswordControllers");
const authResetPasswordControllers_1 = require("../controllers/authResetPasswordControllers");
const checkRequestAuthentication_1 = require("../middleware/checkRequestAuthentication");
const authCheckUserControllers_1 = require("../controllers/authCheckUserControllers");
const router = express_1.default.Router();
router.use(checkRequestAuthentication_1.checkRequestAuthentication);
router.post('/login', authLoginControllers_1.loginUser);
router.post('/signup', authSignupController_1.signupUser);
router.get('/logout', authLogoutControllers_1.logout);
router.get('/check-user-auth', authCheckUserControllers_1.checkUser);
router.post("/forgot-password", authForgotPasswordControllers_1.forgotPassword);
router.post("/reset-password", authResetPasswordControllers_1.resetPassword);
router.get('/user/:id', authGetUserByIdControllers_1.getUserById);
router.get('/address/get-all/:user_id', authGetAllAddressController_1.getAllAddress);
router.delete('/address/delete/:user_id', authDeleteAddressByAddressNumberControllers_1.deleteAddressById);
router.post('/address/add-address/:user_id', authAddNewAddressController_1.addNewAddress);
router.put('/address/update-address/:user_id', authUpdateAddressByIdControllers_1.updateAddress);
router.post('/send-otp', authSendOtpController_1.sendOtp);
router.post('/resend-otp', authResendOtpControllers_1.resendOtp);
router.post('/verify-otp', authVerifyOtpControllers_1.verifyOtp);
exports.default = router;
