import { Request, Response } from 'express';

export const deleteProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const response = await fetch(`${process.env.PRODUCTSERVER}/api/products/delete-product/${id}`, {
            method: 'DELETE',
        });

        const contentType = response.headers.get('content-type');
        let responseBody;
        if (contentType && contentType.includes('application/json')) {
            responseBody = await response.json();
        } else {
            responseBody = await response.text();
        }

        res.status(response.status).json(responseBody);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};