import express, { Router } from 'express';
import { loginUser } from '../controllers/authLoginControllers';
import { signupUser } from '../controllers/authSignupController';
import {getUserById} from '../controllers/authGetUserByIdControllers'

const router: Router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser)
router.get("/:id", getUserById)

export default router;