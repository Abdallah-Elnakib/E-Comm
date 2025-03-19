import { Request, Response } from 'express';
import { db } from '../config/connDB';
import { doc, getDocs, updateDoc ,query, where, collection, documentId} from 'firebase/firestore';

export const updateStatusOrderByOrderId = async (req: Request, res: Response) => {
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

        const ordersCollection = collection(db, 'orders');
        const orderQuery = query(ordersCollection, where(documentId(), '==', OrderId));

        const querySnapshot = await getDocs(orderQuery);

        if (querySnapshot.empty) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        const orderDoc = querySnapshot.docs[0];
        const orderId = orderDoc.id;

        await updateDoc(doc(db, 'orders', orderId), {
            orderStatus: status,
        });

        res.status(200).json({ message: 'Order status updated successfully' });
        return;

    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
};
    