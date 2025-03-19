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
exports.getOrderByOrderId = void 0;
const connDB_1 = require("../config/connDB");
const firestore_1 = require("firebase/firestore");
const getOrderByOrderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { OrderId } = req.params;
        const ordersCollection = (0, firestore_1.collection)(connDB_1.db, 'orders');
        const orderQuery = (0, firestore_1.query)(ordersCollection, (0, firestore_1.where)((0, firestore_1.documentId)(), '==', OrderId));
        const querySnapshot = yield (0, firestore_1.getDocs)(orderQuery);
        if (querySnapshot.empty) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        const order = querySnapshot.docs.map((doc) => doc.data())[0];
        res.status(200).json(order);
        return;
    }
    catch (error) {
        console.error('Error getting order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getOrderByOrderId = getOrderByOrderId;
