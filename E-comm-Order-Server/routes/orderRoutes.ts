import express, { Router } from 'express';
import { createNewOrder } from '../controllers/createNewOrederControllers';
import { getAllOrders } from '../controllers/getAllOrdersControllers';

const router: Router = express.Router();

router.post('/create-order',createNewOrder)
router.get("/all-orders", getAllOrders)

export default router;