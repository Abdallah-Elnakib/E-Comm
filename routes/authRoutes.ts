import express, { Router } from 'express';
import { loginUser } from '../controllers/authLoginControllers';
import { signupUser } from '../controllers/authSignupController';
const router: Router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser)


export default router;