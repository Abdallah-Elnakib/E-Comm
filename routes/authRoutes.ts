// filepath: /home/abdallahelnakib/Desktop/Projects-Node-Js/E-comm-Auth-Server/routes/authRoutes.ts
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
import {verifyJWT} from '../middleware/verifyJWT';

const router: Router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/logout', logout);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.use(verifyJWT);

router.get('/user/:id', getUserById);

router.get('/address/get-all/:user_id', getAllAddress);
router.delete('/address/delete/:user_id', deleteAddressById);
router.post('/address/add-address/:user_id', addNewAddress);
router.put('/address/update-address/:user_id', updateAddress);

router.post('/send-otp', sendOtp);
router.post('/resend-otp', resendOtp);
router.post('/verify-otp', verifyOtp);



export default router;