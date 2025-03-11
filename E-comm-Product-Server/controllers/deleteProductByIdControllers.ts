import { Request, Response } from 'express';
import { connDB } from '../config/connDB';
import { client } from '../config/connRedisServer';

export const deleteProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const con = await connDB();
        const id = req.params.id;

        con.query('SELECT * FROM Product WHERE Id = ?', [id], async (err, results) => {
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

            const product = results[0];
            await client.set(`product:${id}`, JSON.stringify(product), {
                EX: 86400,
            });
            console.log(`Product with ID ${id} saved in Redis for 24 hours`);

            con.query('DELETE FROM Product WHERE Id = ?', [id], (err, results) => {
                if (err) {
                    console.error("Error deleting product: ", err);
                    res.status(500).json({ message: 'Internal server error' });
                    con.end();
                    return;
                }
                res.json({ message: `Product deleted successfully` });
                con.end();
                return;
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return;
    }
}