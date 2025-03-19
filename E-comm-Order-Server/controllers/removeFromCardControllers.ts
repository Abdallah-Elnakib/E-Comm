import { Request, Response } from 'express';
import { db } from '../config/connDB';
import { collection, doc, getDoc, getDocs, updateDoc ,query, where, documentId} from 'firebase/firestore';


export const removeFromCard = async (req: Request, res: Response) => {
    try {
        const { OrderId } = req.params;
        const { productId } = req.body;

        if (!OrderId) {
            res.status(400).json({ message: 'Order ID is required' }); 
            return;
        }

        if (!productId) {
            res.status(400).json({ message: 'Product ID is required' }); 
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
        const orderData = orderDoc.data();

        if (orderData.orderStatus !== 'created') {
            res.status(400).json({ message: 'Order is not in the "created" state' }); 
            return;
        }

        if (orderData.products.length > 0) {
            for (let i = 0; i < orderData.products.length; i++) {
                if (orderData.products[i].productId === productId) {
                    orderData.products.splice(i, 1);
                    await updateDoc(orderDoc.ref, { products: orderData.products });
                    let totalAfterRemove = 0;
                    for (let i = 0; i < orderData.products.length; i++) {
                        totalAfterRemove += orderData.products[i].total;
                    }
                    orderData.total = totalAfterRemove;
                    await updateDoc(orderDoc.ref, { total: orderData.total });

                    res.status(200).json({ message: 'Product removed from the card successfully' });
                    return;
                }
            }
            res.status(404).json({ message: 'Product not found in the card' }); 
            return;
        }
        else {
            res.status(404).json({ message: 'No Products Found In The Card' }); 
            return;
        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' }); 
    }

};