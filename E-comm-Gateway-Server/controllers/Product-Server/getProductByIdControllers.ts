import { Request, Response } from 'express';
import {fetchAnotherServerWithoutBody} from '../../utils/FetchAnotherServer';

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Product id is required" });
            return;
        }
        const response = await fetchAnotherServerWithoutBody(`${process.env.PRODUCTSERVER}/api/products/product/${id}`, 'GET');
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