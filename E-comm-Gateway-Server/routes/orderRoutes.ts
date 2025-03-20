import express, { Router } from 'express';
import { createNewOrder } from '../controllers/Order-Server/createNewOrederControllers';
import { getAllOrders } from '../controllers/Order-Server/getAllOrdersControllers';
import { getOrderByUserId } from '../controllers/Order-Server/getOrderByUserIdControllers';
import { getOrderByOrderId } from '../controllers/Order-Server/getOrderByOrderIdControllers';
import { updateStatusOrderByOrderId } from '../controllers/Order-Server/updateOrderByOrderIdControllers';
import {addNewProductToCardByOrderId} from '../controllers/Order-Server/addNewProductToCardByOrderIdControllers'
import {removeFromCard} from '../controllers/Order-Server/removeFromCardControllers'
import {getAllProductFromCardByCardId} from '../controllers/Order-Server/getAllProductFromCardByCardIdControllers'
import { verifyJWT } from '../middleware/verifyJwt'; 

const router: Router = express.Router();

router.use(verifyJWT);

router.post('/create-order',createNewOrder)
router.get("/all-orders", getAllOrders)
router.get("/user/:userId", getOrderByUserId)
router.get("/order/:OrderId", getOrderByOrderId)
router.patch("/update-status-order/:OrderId", updateStatusOrderByOrderId)
router.post("/add-to-cart/:OrderId", addNewProductToCardByOrderId)
router.delete("/remove-from-cart/:OrderId", removeFromCard)
router.get("/get-all-products/:CardId", getAllProductFromCardByCardId)

export default router;