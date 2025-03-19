"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createNewOrederControllers_1 = require("../controllers/createNewOrederControllers");
const getAllOrdersControllers_1 = require("../controllers/getAllOrdersControllers");
const getOrderByUserIdControllers_1 = require("../controllers/getOrderByUserIdControllers");
const getOrderByOrderIdControllers_1 = require("../controllers/getOrderByOrderIdControllers");
const updateOrderByOrderIdControllers_1 = require("../controllers/updateOrderByOrderIdControllers");
const addNewProductToCardByOrderIdControllers_1 = require("../controllers/addNewProductToCardByOrderIdControllers");
const removeFromCardControllers_1 = require("../controllers/removeFromCardControllers");
const getAllProductFromCardByCardIdControllers_1 = require("../controllers/getAllProductFromCardByCardIdControllers");
const router = express_1.default.Router();
router.post('/create-order', createNewOrederControllers_1.createNewOrder);
router.get("/all-orders", getAllOrdersControllers_1.getAllOrders);
router.get("/user/:userId", getOrderByUserIdControllers_1.getOrderByUserId);
router.get("/order/:OrderId", getOrderByOrderIdControllers_1.getOrderByOrderId);
router.patch("/update-status-order/:OrderId", updateOrderByOrderIdControllers_1.updateStatusOrderByOrderId);
router.post("/add-to-cart/:OrderId", addNewProductToCardByOrderIdControllers_1.addNewProductToCardByOrderId);
router.delete("/remove-from-cart/:OrderId", removeFromCardControllers_1.removeFromCard);
router.get("/get-all-products/:CardId", getAllProductFromCardByCardIdControllers_1.getAllProductFromCardByCardId);
exports.default = router;
