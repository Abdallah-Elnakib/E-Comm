import express, { Router } from 'express';
import { loginUser } from '../controllers/Auth-Server/authLoginControllers';
import { signupUser } from '../controllers/Auth-Server/authSignupController';
import { getUserById } from '../controllers/Auth-Server/authGetUserByIdControllers';
import { getAllAddress } from '../controllers/Auth-Server/authGetAllAddressController';
import { deleteAddressByAddressNumber } from '../controllers/Auth-Server/authDeleteAddressByAddressNumberControllers';
import { addNewAddress } from '../controllers/Auth-Server/authAddNewAddressController';
import { updateAddress } from '../controllers/Auth-Server/authUpdateAddressByIdControllers';
import { logout } from '../controllers/Auth-Server/authLogoutControllers';
import { sendOtp } from '../controllers/Auth-Server/authSendOtpController';
import { resendOtp } from '../controllers/Auth-Server/authResendOtpControllers';
import { verifyOtp } from '../controllers/Auth-Server/authVerifyOtpControllers';
import { forgotPassword } from '../controllers/Auth-Server/authForgotPasswordControllers';
import { resetPassword } from '../controllers/Auth-Server/authResetPasswordControllers';
import {checkUser} from '../controllers/Auth-Server/authCheckUserControllers';
import { verifyJWT } from '../middleware/verifyJwt'; 

const router: Router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/logout', logout);
router.get('/check-user-auth', checkUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.use(verifyJWT);

router.get('/user/:id', getUserById);

router.get('/address/get-all/:user_id', getAllAddress);
router.delete('/address/delete/:user_id', deleteAddressByAddressNumber);
router.post('/address/add-address/:user_id', addNewAddress);
router.put('/address/update-address/:user_id', updateAddress);

router.post('/send-otp', sendOtp);
router.post('/resend-otp', resendOtp);
router.post('/verify-otp', verifyOtp);



export default router;