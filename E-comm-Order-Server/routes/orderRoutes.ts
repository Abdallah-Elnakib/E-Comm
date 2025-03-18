import express, { Router } from 'express';
import { createNewOrder } from '../controllers/createNewOrederControllers';

const router: Router = express.Router();

router.post('/create-order',createNewOrder)

export default router;