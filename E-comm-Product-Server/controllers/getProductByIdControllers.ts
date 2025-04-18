import { Request, Response } from 'express';
import { connDB } from '../config/connDB';

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const con = await connDB();
        const id = req.params.id;

        con.query('SELECT * FROM Product WHERE Id = ?', [id], (err, results) => {
            if (err) {
                console.error("Error fetching product: ", err);
                res.status(500).json({ message: 'Internal server error' });
                con.end();
                return;
            }
            if (results.length === 0) {
                res.status(404).json({ message: 'Product not found' });
                con.end();
                return;
            }
            res.json(results[0]);
            con.end();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};