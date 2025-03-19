import { Request, Response } from 'express';
import { db } from '../config/connDB';
import { collection, getDocs } from 'firebase/firestore';

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const ordersRef = collection(db, 'orders');
        const ordersSnapshot = await getDocs(ordersRef);
        const ordersList = ordersSnapshot.docs.map((doc) => doc.data());
        res.status(200).json(ordersList);
        return;
    } catch (error) {
        console.error('Error getting orders:', error);
        res.status(500).json({ message: 'Internal server error' }); 
    }
};