import { Request, Response } from 'express';
import { db } from '../config/connDB';
import { getDocs, query, where, collection, documentId} from 'firebase/firestore';


export const getOrderByOrderId = async (req: Request, res: Response) => {
    try {
        const { OrderId } = req.params;
        const ordersCollection = collection(db, 'orders');
        const orderQuery = query(ordersCollection, where(documentId(), '==', OrderId));

        const querySnapshot = await getDocs(orderQuery);

        if (querySnapshot.empty) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        const order = querySnapshot.docs.map((doc) => doc.data())[0];
        res.status(200).json(order);
        return;
    } catch (error) {
        console.error('Error getting order:', error);
        res.status(500).json({ message: 'Internal server error' }); 
    }
};