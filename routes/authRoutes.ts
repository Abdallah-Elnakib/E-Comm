import express, { Router } from 'express';
import { loginUser } from '../controllers/authLoginControllers';

const router: Router = express.Router();

router.post('/login', loginUser);

export default router;