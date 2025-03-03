import { Request, Response } from 'express';
import { connDB } from '../config/connDB';

export const getProductById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const con = await connDB();
        const { id } = req.params;
        const [rows]: any = await con.query('SELECT * FROM products WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};