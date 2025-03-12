import { Request, Response } from 'express';
import { connDB } from '../config/connDB';

export const getReviewByProductId = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Product ID is required" });
            return;
        }

        const con = await connDB();
        const sql = "SELECT * FROM reviews WHERE Product_id = ?";
        con.query(sql, [id], (err, result) => {
            if (err) {
                console.error("Error fetching reviews: ", err);
                res.status(500).json({ message: "Internal server error" });
                con.end();
                return;
            }
            res.status(200).json(result);
            con.end();
            return;
        });
    } catch (error) {
        console.error("Database connection failed: ", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};