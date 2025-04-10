import { Request, Response } from 'express';
import { connDB } from '../config/connDB';

export const addNewProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, category, price, stock } = req.body;
        if (!title || !price || !description || !category || !stock) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const con = await connDB();
        const sql = "INSERT INTO Product (Title, Description, Category, Price, Rating, Stock) VALUES ?";
        const values = [[title, description, category, price, 0, stock]];

        con.query(sql, [values], (err, result) => {
            if (err) {
                console.error("Error inserting product: ", err);
                res.status(500).json({ message: "Internal server error" });
                con.end();
                return;
            }
            res.status(200).json({ message: "Product added successfully" });
            return;
            con.end();
        });
    } catch (error) {
        console.error("Database connection failed: ", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};