import express, { Router } from 'express';
import { loginUser } from '../controllers/Auth-Server/authLoginControllers';
import { signupUser } from '../controllers/Auth-Server/authSignupController';
import { getUserById } from '../controllers/Auth-Server/authGetUserByIdControllers';
import { getAllAddress } from '../controllers/Auth-Server/authGetAllAddressController';
// import { deleteAddressById } from '../controllers/authDeleteAddressByAddressNumberControllers';
// import { addNewAddress } from '../controllers/authAddNewAddressController';
// import { updateAddress } from '../controllers/authUpdateAddressByIdControllers';
import { logout } from '../controllers/Auth-Server/authLogoutControllers';
// import { sendOtp } from '../controllers/authSendOtpController';
// import { resendOtp } from '../controllers/authResendOtpControllers';
// import { verifyOtp } from '../controllers/authVerifyOtpControllers';
import { forgotPassword } from '../controllers/Auth-Server/authForgotPasswordControllers';
import { resetPassword } from '../controllers/Auth-Server/authResetPasswordControllers';
import {checkUser} from '../controllers/Auth-Server/authCheckUserControllers';

const router: Router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/logout', logout);
router.get('/check-user-auth', checkUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


router.get('/user/:id', getUserById);

router.get('/address/get-all/:user_id', getAllAddress);
// router.delete('/address/delete/:user_id', deleteAddressById);
// router.post('/address/add-address/:user_id', addNewAddress);
// router.put('/address/update-address/:user_id', updateAddress);

// router.post('/send-otp', sendOtp);
// router.post('/resend-otp', resendOtp);
// router.post('/verify-otp', verifyOtp);



export default router;