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
exports.getOrderByUserId = void 0;
const connDB_1 = require("../config/connDB");
const firestore_1 = require("firebase/firestore");
const getOrderByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        console.log('User ID:', userId);
        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        const ordersCollection = (0, firestore_1.collection)(connDB_1.db, 'orders');
        const userOrdersQuery = (0, firestore_1.query)(ordersCollection, (0, firestore_1.where)("userId", "==", userId));
        const querySnapshot = yield (0, firestore_1.getDocs)(userOrdersQuery);
        if (querySnapshot.empty) {
            res.status(404).json({ message: 'No orders found for the user' });
            return;
        }
        else {
            const orders = querySnapshot.docs.map((doc) => doc.data());
            res.status(200).json(orders);
            return;
        }
    }
    catch (error) {
        console.error('Error getting orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getOrderByUserId = getOrderByUserId;
