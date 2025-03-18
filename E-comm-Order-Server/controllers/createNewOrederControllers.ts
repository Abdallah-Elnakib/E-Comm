import { Request, Response } from 'express';
import { db } from '../config/connDB';
import { orderSchema, Order } from '../models/orderSchema';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export const createNewOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, products, orderStatus, total } = req.body;

        const validation = orderSchema.safeParse({ userId, products, orderStatus, total });
        if (!validation.success) {
            res.status(400).json({ message: validation.error.errors[0].message });
            return;
        }

        const newOrder: Order = {
            userId,
            products,
            orderStatus,
            total,
        };

        const ordersCollection = collection(db, 'orders');
        const docRef = await addDoc(ordersCollection, newOrder);

        res.status(201).json({ message: "Order created successfully", data: { id: docRef.id, ...newOrder } });
        return;

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Internal server error", error: error instanceof Error ? error.message : "Unknown error" });
    }
};