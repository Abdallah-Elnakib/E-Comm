import { Request, Response } from 'express';
import { db } from '../config/connDB';
import { collection, where , query, getDocs} from 'firebase/firestore';

export const getOrderByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        console.log('User ID:', userId);
        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        const ordersCollection = collection(db, 'orders');
        const userOrdersQuery = query(
                ordersCollection,
                where("userId", "==", userId),
        );

        const querySnapshot = await getDocs(userOrdersQuery);

        if (querySnapshot.empty) {
            res.status(404).json({ message: 'No orders found for the user' });
            return;
        } else {
            const orders = querySnapshot.docs.map((doc) => doc.data());
            res.status(200).json(orders);
            return;
        }
    } catch (error) {
        console.error('Error getting orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
    