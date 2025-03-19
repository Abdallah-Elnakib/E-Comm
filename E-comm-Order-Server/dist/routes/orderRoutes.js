"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createNewOrederControllers_1 = require("../controllers/createNewOrederControllers");
const getAllOrdersControllers_1 = require("../controllers/getAllOrdersControllers");
const router = express_1.default.Router();
router.post('/create-order', createNewOrederControllers_1.createNewOrder);
router.get("/all-orders", getAllOrdersControllers_1.getAllOrders);
exports.default = router;
