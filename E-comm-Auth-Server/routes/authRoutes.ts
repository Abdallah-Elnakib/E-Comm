import express, { Router } from 'express';
import { loginUser } from '../controllers/authLoginControllers';
import { signupUser } from '../controllers/authSignupController';
import { getUserById } from '../controllers/authGetUserByIdControllers';
import { getAllAddress } from '../controllers/authGetAllAddressController';
import { deleteAddressById } from '../controllers/authDeleteAddressByAddressNumberControllers';
import { addNewAddress } from '../controllers/authAddNewAddressController';
import { updateAddress } from '../controllers/authUpdateAddressByIdControllers';
import { logout } from '../controllers/authLogoutControllers';
import { sendOtp } from '../controllers/authSendOtpController';
import { resendOtp } from '../controllers/authResendOtpControllers';
import { verifyOtp } from '../controllers/authVerifyOtpControllers';
import { forgotPassword } from '../controllers/authForgotPasswordControllers';
import { resetPassword } from '../controllers/authResetPasswordControllers';
import {checkRequestAuthentication} from '../middleware/checkRequestAuthentication';
import {checkUser} from '../controllers/authCheckUserControllers';


const router: Router = express.Router();

router.use(checkRequestAuthentication);

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/logout', logout);
router.get('/check-user-auth', checkUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get('/user/:id', getUserById);

router.get('/address/get-all/:user_id', getAllAddress);
router.delete('/address/delete/:user_id', deleteAddressById);
router.post('/address/add-address/:user_id', addNewAddress);
router.put('/address/update-address/:user_id', updateAddress);

router.post('/send-otp', sendOtp);
router.post('/resend-otp', resendOtp);
router.post('/verify-otp', verifyOtp);



export default router;