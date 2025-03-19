import { Request, Response } from 'express';
import { db } from '../config/connDB';
import { orderSchema, Order} from '../models/orderSchema';
import { collection, doc, getDoc, getDocs, updateDoc ,query, where, documentId} from 'firebase/firestore';

export const addNewProductToCardByOrderId = async (req: Request, res: Response) => {
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

        const productSchema = orderSchema.shape.products;
        const validation = productSchema.safeParse({ productId, quantity, price, total });
        if (!validation.success) {
            res.status(400).json({ message: validation.error.errors[0].message });
            return;
        }


        const ordersCollection = collection(db, 'orders');
        const orderQuery = query(ordersCollection, where(documentId(), '==', OrderId));

        const querySnapshot = await getDocs(orderQuery);

        if (querySnapshot.empty) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }


        const orderData = querySnapshot.docs[0].data() as Order;
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

        await updateDoc(doc(db, 'orders', OrderId), {
            products: updatedProducts,
            total: totalAfterCal,
        });

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};