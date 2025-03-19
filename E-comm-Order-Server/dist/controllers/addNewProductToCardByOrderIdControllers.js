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
exports.addNewProductToCardByOrderId = void 0;
const connDB_1 = require("../config/connDB");
const firestore_1 = require("firebase/firestore");
const addNewProductToCardByOrderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { OrderId } = req.params;
        const { productId, quantity, price } = req.body;
        if (!OrderId) {
            res.status(400).json({ message: 'Order ID is required' });
            return;
        }
        if (!productId || !quantity || !price) {
            res.status(400).json({ message: 'Product ID, quantity, and price are required' });
            return;
        }
        let total = quantity * price;
        // const productSchema = orderSchema.shape.products;
        // const validation = productSchema.safeParse({ productId, quantity, price, total });
        // if (!validation.success) {
        //     res.status(400).json({ message: validation.error.errors[0].message });
        //     return;
        // }
        const ordersCollection = (0, firestore_1.collection)(connDB_1.db, 'orders');
        const orderQuery = (0, firestore_1.query)(ordersCollection, (0, firestore_1.where)((0, firestore_1.documentId)(), '==', OrderId));
        const querySnapshot = yield (0, firestore_1.getDocs)(orderQuery);
        if (querySnapshot.empty) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        const orderData = querySnapshot.docs[0].data();
        if (orderData.orderStatus !== 'created') {
            res.status(400).json({ message: 'Order is not in the "created" state' });
            return;
        }
        const updatedProducts = [...(orderData.products || []), {
                productId,
                quantity,
                price,
                total,
            }];
        const totalAfterCal = (orderData.total || 0) + (total || 0);
        console.log(typeof (orderData.products));
        yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(connDB_1.db, 'orders', OrderId), {
            products: updatedProducts,
            total: totalAfterCal,
        });
        res.status(200).json({ message: 'Product added to cart successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.addNewProductToCardByOrderId = addNewProductToCardByOrderId;
