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
exports.getAllOrders = void 0;
const connDB_1 = require("../config/connDB");
const firestore_1 = require("firebase/firestore");
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ordersRef = (0, firestore_1.collection)(connDB_1.db, 'orders');
        const ordersSnapshot = yield (0, firestore_1.getDocs)(ordersRef);
        const ordersList = ordersSnapshot.docs.map((doc) => doc.data());
        res.status(200).json(ordersList);
        return;
    }
    catch (error) {
        console.error('Error getting orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllOrders = getAllOrders;
