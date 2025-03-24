import { Request, Response } from 'express';
import { connDB } from '../config/connDB';
import {sendEmail} from '../config/rabbitmq';




export const addNewReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const con = await connDB();
        const { product_id, rating, review , reviewer_name, reviewer_email} = req.body;
        if (!product_id || !rating || !review || !reviewer_name || !reviewer_email) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        if (rating < 1 || rating > 5) {
            res.status(400).json({ message: "Rating should be between 1 and 5" });
            return;
        }
        con.query('SELECT * FROM Product WHERE Id = ?', [product_id], (err, results) => {
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


            const sql = "INSERT INTO reviews (Product_id, Rating, Review, Reviewer_name, Reviewer_email) VALUES ?";
            const values = [[product_id, rating, review, reviewer_name, reviewer_email]];
            
            con.query(sql, [values], async (err, result) => {
                if (err) {
                    console.error("Error inserting review: ", err);
                    res.status(500).json({ message: "Internal server error" });
                    con.end();
                    return;
                }
                if (rating === 5 || rating === 4) await sendEmail({'message': 'Review-5-Or-4', email: reviewer_email});
                if (rating === 3) await sendEmail({'message': 'Review-3', email: reviewer_email});
                if (rating === 1 || rating === 2) await sendEmail({'message': 'Review-1-Or-2', email: reviewer_email});
                
                res.status(200).json({ message: "Review added successfully" });
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