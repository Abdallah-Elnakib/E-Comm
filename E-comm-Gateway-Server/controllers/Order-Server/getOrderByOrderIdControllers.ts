import e, { Request, Response } from 'express';
import { fetchAnotherServerWithoutBody} from '../../utils/FetchAnotherServer';

export const getOrderByOrderId = async (req: Request, res: Response) => {
    try {
        const response = await fetchAnotherServerWithoutBody(`${process.env.ORDERSERVER}/api/orders/order/${req.params.OrderId}`, 'GET');
        if ('status' in response) {
            const responseData = await response.json();
            res.status(response.status).json(responseData);
            return;
        } else {
            res.status(500).json({ message: "Error from order server" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};