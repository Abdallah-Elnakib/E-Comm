import { Request, Response } from 'express';
import {fetchAnotherServerWithoutBody} from '../../utils/FetchAnotherServer';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await fetchAnotherServerWithoutBody(`${process.env.PRODUCTSERVER}/api/products/all-products`, 'GET');
        if ('status' in response) {
            const responseData = await response.json();
            res.status(response.status).json(responseData);
        } else {
            res.status(500).json({ message: "Error from product server" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};