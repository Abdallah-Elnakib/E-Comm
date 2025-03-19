import express, { Router } from 'express';
import { createNewOrder } from '../controllers/createNewOrederControllers';
import { getAllOrders } from '../controllers/getAllOrdersControllers';
import { getOrderByUserId } from '../controllers/getOrderByUserIdControllers';
import { updateStatusOrderByOrderId } from '../controllers/updateOrderByOrderIdControllers';
import {addNewProductToCardByOrderId} from '../controllers/addNewProductToCardByOrderIdControllers'

const router: Router = express.Router();

router.post('/create-order',createNewOrder)
router.get("/all-orders", getAllOrders)
router.get("/user/:userId", getOrderByUserId)
router.patch("/update-status-order/:OrderId", updateStatusOrderByOrderId)
router.post("/add-to-cart/:OrderId", addNewProductToCardByOrderId)

export default router;