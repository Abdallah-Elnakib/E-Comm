import { Request, Response } from 'express';
import { connDB } from '../config/connDB';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        connDB().then((con) => {
            console.log("Connected Database!.......");
            const sql = "SELECT * FROM Product";
            con.query(sql, function (err, result) {
                if (err) {
                    console.error("Error fetching products: ", err);
                    res.status(500).json({ message: "Internal server error" });
                    con.end();
                    return;
                }
                res.status(200).json({ products: result });
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
}