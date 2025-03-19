"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewOrder = void 0;
const connDB_1 = require("../config/connDB");
const orderSchema_1 = require("../models/orderSchema");
const firestore_1 = require("firebase/firestore");
const createNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let ProductsData = [];
        let totalAfterCal = 0;
        const { userId, products, orderStatus, total } = req.body;
        const validation = orderSchema_1.orderSchema.safeParse({ userId, products, orderStatus, total });
        if (!validation.success) {
            res.status(400).json({ message: validation.error.errors[0].message });
            return;
        }
        if (products) {
            for (let i = 0; i < products.length; i++) {
                products[i].total = products[i].quantity * products[i].price;
                totalAfterCal += products[i].total;
            }
            ProductsData = products;
        }
        const ordersCollection = (0, firestore_1.collection)(connDB_1.db, 'orders');
        const userOrdersQuery = (0, firestore_1.query)(ordersCollection, (0, firestore_1.where)("userId", "==", userId), (0, firestore_1.where)("orderStatus", "==", "created"));
        const querySnapshot = yield (0, firestore_1.getDocs)(userOrdersQuery);
        if (!querySnapshot.empty) {
            res.status(400).json({ message: "User already has an order in the 'create' state." });
            return;
        }
        const newOrder = {
            userId,
            products: ProductsData,
            orderStatus,
            total: totalAfterCal,
        };
        const docRef = yield (0, firestore_1.addDoc)(ordersCollection, newOrder);
        res.status(201).json({
            message: "Order created successfully",
            data: Object.assign({ id: docRef.id }, newOrder)
        });
    }
    catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});
exports.createNewOrder = createNewOrder;
