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
exports.removeFromCard = void 0;
const connDB_1 = require("../config/connDB");
const firestore_1 = require("firebase/firestore");
const removeFromCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { OrderId } = req.params;
        const { productId } = req.body;
        if (!OrderId) {
            res.status(400).json({ message: 'Order ID is required' });
            return;
        }
        if (!productId) {
            res.status(400).json({ message: 'Product ID is required' });
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
        const orderData = orderDoc.data();
        if (orderData.orderStatus !== 'created') {
            res.status(400).json({ message: 'Order is not in the "created" state' });
            return;
        }
        if (orderData.products.length > 0) {
            for (let i = 0; i < orderData.products.length; i++) {
                if (orderData.products[i].productId === productId) {
                    orderData.products.splice(i, 1);
                    yield (0, firestore_1.updateDoc)(orderDoc.ref, { products: orderData.products });
                    let totalAfterRemove = 0;
                    for (let i = 0; i < orderData.products.length; i++) {
                        totalAfterRemove += orderData.products[i].total;
                    }
                    orderData.total = totalAfterRemove;
                    yield (0, firestore_1.updateDoc)(orderDoc.ref, { total: orderData.total });
                    res.status(200).json({ message: 'Product removed from the card successfully' });
                    return;
                }
            }
            res.status(404).json({ message: 'Product not found in the card' });
            return;
        }
        else {
            res.status(404).json({ message: 'No Products Found In The Card' });
            return;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.removeFromCard = removeFromCard;
