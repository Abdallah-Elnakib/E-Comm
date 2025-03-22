import { Request, Response } from 'express';
import { fetchAnotherServer } from '../../utils/FetchAnotherServer';

export const removeFromCard = async (req: Request, res: Response) => {
    try {
        const response = await fetchAnotherServer(`${process.env.ORDERSERVER}/api/orders/remove-from-cart/${req.params.OrderId}`, 'DELETE', req.body);
        if ('status' in response) {
            const responseData = await response.json();
            res.status(response.status).json(responseData);
            return
        } else {
            res.status(500).json({ message: "Error from order server" });
            return;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};