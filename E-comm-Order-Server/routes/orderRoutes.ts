import express, { Router } from 'express';
import { createNewOrder } from '../controllers/createNewOrederControllers';
import { getAllOrders } from '../controllers/getAllOrdersControllers';
import { getOrderByUserId } from '../controllers/getOrderByUserIdControllers';
import { getOrderByOrderId } from '../controllers/getOrderByOrderIdControllers';
import { updateStatusOrderByOrderId } from '../controllers/updateOrderByOrderIdControllers';
import {addNewProductToCardByOrderId} from '../controllers/addNewProductToCardByOrderIdControllers'
import {removeFromCard} from '../controllers/removeFromCardControllers'
import {getAllProductFromCardByCardId} from '../controllers/getAllProductFromCardByCardIdControllers'
import {checkRequestAuthentication} from '../middleware/checkRequestAuthentication'

const router: Router = express.Router();

router.use(checkRequestAuthentication)

router.post('/create-order',createNewOrder)
router.get("/all-orders", getAllOrders)
router.get("/user/:userId", getOrderByUserId)
router.get("/order/:OrderId", getOrderByOrderId)
router.patch("/update-status-order/:OrderId", updateStatusOrderByOrderId)
router.post("/add-to-cart/:OrderId", addNewProductToCardByOrderId)
router.delete("/remove-from-cart/:OrderId", removeFromCard)
router.get("/get-all-products/:CardId", getAllProductFromCardByCardId)

export default router;