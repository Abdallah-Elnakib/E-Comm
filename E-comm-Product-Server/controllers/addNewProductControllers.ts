import { Request, Response } from 'express';
import { connDB } from '../config/connDB';

export const addNewProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, category, price, stock } = req.body;
        if (!title || !price || !description || !category || !stock) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        connDB().then((con) => {
            console.log("Connected Database!.......");
            const sql = "INSERT INTO Product (Title, Description, Category, Price, Rating, Stock) VALUES ?";
            const values = [[title, description, category, price, 0, stock]];

            con.query(sql, [values], function (err, result) {
                if (err) {
                    console.error("Error inserting product: ", err);
                    res.status(500).json({ message: "Internal server error" });
                    con.end();
                    return;
                }
                res.status(200).json({ message: "Product added successfully" });
                con.end();
                return;
            });
        }).catch((err) => {
            console.error("Database connection failed: ", err);
            res.status(500).json({ message: "Internal server error" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};