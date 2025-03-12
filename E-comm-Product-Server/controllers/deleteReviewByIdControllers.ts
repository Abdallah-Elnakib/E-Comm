import { Request, Response } from 'express';
import { connDB } from '../config/connDB';

export const deleteReviewById = async (req: Request, res: Response): Promise<void> => {
    try {
        const con = await connDB();
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Review id is required" });
            return;
        }
        con.query('SELECT * FROM reviews WHERE Id = ?', [id], (err, results) => {
            if (err) {
                console.error("Error fetching review: ", err);
                res.status(500).json({ message: 'Internal server error' });
                con.end();
                return;
            }
            if (results.length === 0) {
                res.status(404).json({ message: 'Review not found' });
                con.end();
                return;
            }
            con.query('DELETE FROM reviews WHERE Id = ?', [id], (err, results) => {
                if (err) {
                    console.error("Error deleting review: ", err);
                    res.status(500).json({ message: 'Internal server error' });
                    con.end();
                    return;
                }
                res.status(200).json({ message: 'Review deleted successfully' });
                con.end();
                return;
            });
        });
    } catch (error) {
        console.error("Database connection failed: ", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}