import { Request, Response } from 'express';
import { connDB } from '../config/connDB';

export const getReviewById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Review ID is required" });
            return;
        }

        const con = await connDB();
        const sql = "SELECT * FROM reviews WHERE id = ?";
        con.query(sql, [id], (err, result) => {
            if (err) {
                console.error("Error fetching review: ", err);
                res.status(500).json({ message: "Internal server error" });
                con.end();
                return;
            }
            if (result.length === 0) {
                res.status(404).json({ message: "Review not found" });
                con.end();
                return;
            }
            res.status(200).json({ message: "Review fetched successfully", data: result[0] });
            con.end();
            return;
        });
    } catch (error) {
        console.error("Database connection failed: ", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};