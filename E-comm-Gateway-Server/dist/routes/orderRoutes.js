"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createNewOrederControllers_1 = require("../controllers/Order-Server/createNewOrederControllers");
// import { getAllOrders } from '../controllers/getAllOrdersControllers';
// import { getOrderByUserId } from '../controllers/getOrderByUserIdControllers';
// import { getOrderByOrderId } from '../controllers/getOrderByOrderIdControllers';
// import { updateStatusOrderByOrderId } from '../controllers/updateOrderByOrderIdControllers';
// import {addNewProductToCardByOrderId} from '../controllers/addNewProductToCardByOrderIdControllers'
// import {removeFromCard} from '../controllers/removeFromCardControllers'
// import {getAllProductFromCardByCardId} from '../controllers/getAllProductFromCardByCardIdControllers'
const router = express_1.default.Router();
router.post('/create-order', createNewOrederControllers_1.createNewOrder);
// router.get("/all-orders", getAllOrders)
// router.get("/user/:userId", getOrderByUserId)
// router.get("/order/:OrderId", getOrderByOrderId)
// router.patch("/update-status-order/:OrderId", updateStatusOrderByOrderId)
// router.post("/add-to-cart/:OrderId", addNewProductToCardByOrderId)
// router.delete("/remove-from-cart/:OrderId", removeFromCard)
// router.get("/get-all-products/:CardId", getAllProductFromCardByCardId)
exports.default = router;
