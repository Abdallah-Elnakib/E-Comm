import { Request, Response } from 'express';
import {fetchAnotherServer} from '../../utils/FetchAnotherServer';

export const editProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, description, category, price, stock } = req.body;
        if (!title || !price || !description || !category || !stock) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const response = await fetchAnotherServer(`${process.env.PRODUCTSERVER}/api/products/edit-product/${id}`, 'PUT', { title, description, category, price, stock });
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