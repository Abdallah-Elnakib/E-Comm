import { Request, Response } from 'express';
import { connDB } from '../config/connDB';

export const editProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const con = await connDB();
        const id = req.params.id;
        const { title, description, category, price, stock } = req.body;

        if (!title || !price || !description || !category || !stock) {
            res.status(400).json({ message: 'All fields are required' });
            con.end();
            return;
        }

        con.query('UPDATE Product SET Title = ?, Description = ?, Category = ?, Price = ?, Stock = ? WHERE Id = ?', [title, description, category, price, stock, id], (err, results) => {
            if (err) {
                console.error("Error updating product: ", err);
                res.status(500).json({ message: 'Internal server error' });
                con.end();
                return;
            }
            if (results.affectedRows === 0) {
                res.status(404).json({ message: 'Product not found' });
                con.end();
                return;
            }
            res.json({ message: 'Product updated successfully' });
            con.end();
            return;
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};