import { Request, Response } from 'express';
import { connDB } from '../config/connDB';

export const getProductRating = async (req: Request, res: Response): Promise<void> => {
    try {
        const con = await connDB();
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Product id is required" });
            return;
        }
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
            con.query('SELECT AVG(Rating) as avgRating FROM reviews WHERE Product_id = ?', [id], (err, results) => {
                if (err) {
                    console.error("Error fetching product rating: ", err);
                    res.status(500).json({ message: 'Internal server error' });
                    con.end();
                    return;
                }
                con.query('UPDATE Product SET Rating = ? WHERE Id = ?', [results[0].avgRating, id], (err, results) => {
                    if (err) {
                        console.error("Error updating product rating: ", err);
                        res.status(500).json({ message: 'Internal server error' });
                        con.end();
                        return;
                    }
                });
                res.status(200).json({ avgRating: results[0].avgRating });
                con.end();
                return;
                
            });
        });
    } catch (error) {
        console.error("Database connection failed: ", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};