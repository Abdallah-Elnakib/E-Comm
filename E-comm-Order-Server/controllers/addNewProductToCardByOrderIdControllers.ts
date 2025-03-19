import { Request, Response } from 'express';
import { db } from '../config/connDB';
import { orderSchema, Order} from '../models/orderSchema';
import { collection, doc, getDoc, getDocs, updateDoc ,query, where, documentId} from 'firebase/firestore';

export const addNewProductToCardByOrderId = async (req: Request, res: Response) => {
    try {
        const { OrderId } = req.params;
        const { product } = req.body;

        if (!OrderId) {
            res.status(400).json({ message: 'Order ID is required' });
            return;
        }

        if (!product) {
            res.status(400).json({ message: 'Product is required' });
            return;
        }

        const productSchema = orderSchema.shape.products;
        const validation = productSchema.safeParse(product);
        if (!validation.success) {
            res.status(400).json({ message: validation.error.errors[0].message });
            return;
        }


        product.total = product.quantity * product.price;

        const ordersCollection = collection(db, 'orders');
        const orderQuery = query(ordersCollection, where(documentId(), '==', OrderId));
        
        const querySnapshot = await getDocs(orderQuery);

        if (!querySnapshot.empty) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }


        const orderData = querySnapshot.docs[0].data() as Order;
        if (orderData.orderStatus !== 'created') {
            res.status(400).json({ message: 'Order is not in the "created" state' });
            return;
        }

        const updatedProducts = [...(orderData.products || []), product];
        const totalAfterCal = (orderData.total || 0) + product.total;

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