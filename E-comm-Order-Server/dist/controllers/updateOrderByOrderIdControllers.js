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
exports.updateStatusOrderByOrderId = void 0;
const connDB_1 = require("../config/connDB");
const firestore_1 = require("firebase/firestore");
const updateStatusOrderByOrderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { OrderId } = req.params;
        const { status } = req.body;
        if (!OrderId) {
            res.status(400).json({ message: 'Order ID is required' });
            return;
        }
        if (!status) {
            res.status(400).json({ message: 'Order status is required' });
            return;
        }
        if (status !== 'in-progress' && status !== 'completed' && status !== 'cancelled' && status !== 'delivered') {
            res.status(400).json({ message: 'Invalid order status' });
            return;
        }
        const ordersCollection = (0, firestore_1.collection)(connDB_1.db, 'orders');
        const orderQuery = (0, firestore_1.query)(ordersCollection, (0, firestore_1.where)((0, firestore_1.documentId)(), '==', OrderId));
        const querySnapshot = yield (0, firestore_1.getDocs)(orderQuery);
        if (querySnapshot.empty) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        const orderDoc = querySnapshot.docs[0];
        const orderId = orderDoc.id;
        yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(connDB_1.db, 'orders', orderId), {
            orderStatus: status,
        });
        res.status(200).json({ message: 'Order status updated successfully' });
        return;
    }
    catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
});
exports.updateStatusOrderByOrderId = updateStatusOrderByOrderId;
