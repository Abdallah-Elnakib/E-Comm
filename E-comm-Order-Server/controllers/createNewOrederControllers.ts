import { Request, Response } from 'express';
import { db } from '../config/connDB';
import { orderSchema, Order } from '../models/orderSchema';
import { addDoc, collection, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

export const createNewOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        let ProductsData: any[] = []; 
        let totalAfterCal = 0;
        const { userId, userEmail ,products, orderStatus, total } = req.body;

        const validation = orderSchema.safeParse({ userId, userEmail, products, orderStatus, total });
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

        const ordersCollection = collection(db, 'orders');
        const userOrdersQuery = query(
            ordersCollection,
            where("userId", "==", userId),
            where("orderStatus", "==", "created")
        );

        const querySnapshot = await getDocs(userOrdersQuery);

        if (!querySnapshot.empty) {
            res.status(400).json({ message: "User already has an order in the 'create' state." });
            return;
        }

        const newOrder: Order = {
            userId,
            userEmail,
            products: ProductsData, 
            orderStatus,
            total: totalAfterCal,
        };

        const docRef = await addDoc(ordersCollection, newOrder);

        res.status(201).json({
            message: "Order created successfully",
            data: { id: docRef.id, ...newOrder }
        });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};