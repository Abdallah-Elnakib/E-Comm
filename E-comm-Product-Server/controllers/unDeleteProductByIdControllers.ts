import { Request, Response } from 'express';
import { connDB } from '../config/connDB';
import { client } from '../config/connRedisServer';


export const undeleteProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const con = await connDB();
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ message: 'All fields are required' });
            con.end();
            return;
        }
        const product = await client.get(`product:${id}`);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            con.end();
            return;
        }
        con.query('INSERT INTO Product SET ?', JSON.parse(product), (err, results) => {
            if (err) {
                console.error("Error inserting product: ", err);
                res.status(500).json({ message: 'Internal server error' });
                con.end();
                return;
            }
            res.json({ message: `Product undeleted successfully` });
            con.end();
            return;
        });
        await client.del(`product:${id}`);
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        return
    }
};