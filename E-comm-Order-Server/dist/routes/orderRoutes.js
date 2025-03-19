"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createNewOrederControllers_1 = require("../controllers/createNewOrederControllers");
const getAllOrdersControllers_1 = require("../controllers/getAllOrdersControllers");
const getOrderByUserIdControllers_1 = require("../controllers/getOrderByUserIdControllers");
const updateOrderByOrderIdControllers_1 = require("../controllers/updateOrderByOrderIdControllers");
const addNewProductToCardByOrderIdControllers_1 = require("../controllers/addNewProductToCardByOrderIdControllers");
const router = express_1.default.Router();
router.post('/create-order', createNewOrederControllers_1.createNewOrder);
router.get("/all-orders", getAllOrdersControllers_1.getAllOrders);
router.get("/user/:userId", getOrderByUserIdControllers_1.getOrderByUserId);
router.patch("/update-status-order/:OrderId", updateOrderByOrderIdControllers_1.updateStatusOrderByOrderId);
router.post("/add-to-cart/:OrderId", addNewProductToCardByOrderIdControllers_1.addNewProductToCardByOrderId);
exports.default = router;
