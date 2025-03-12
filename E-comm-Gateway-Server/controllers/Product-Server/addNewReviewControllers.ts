import e, { Request, Response } from 'express';
import {fetchAnotherServer} from '../../utils/FetchAnotherServer';

export const addNewReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { product_id, rating, review , reviewer_name, reviewer_email} = req.body;
        if (!product_id || !rating || !review || !reviewer_name || !reviewer_email) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const response = await fetchAnotherServer(`${process.env.PRODUCTSERVER}/api/reviews/add-new-review`, 'POST', { product_id, rating, review, reviewer_name, reviewer_email });
        if ('status' in response) {
            const responseData = await response.json();
            res.status(response.status).json(responseData);
        } else {
            res.status(500).json({ message: "Error from product server" });
        }
        
    }
    catch (error) {
        console.error("Internal server error: ", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};