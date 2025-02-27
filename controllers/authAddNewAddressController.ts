import { Request, Response } from 'express';
import { User } from '../models/userModel';

export const addNewAddress = async (req: Request, res: Response): Promise<void> => {
    const {user_id} = req.params;
    const {address} = req.body;
    try {
        const users = await User.findById({ _id: user_id });
        if (!users) {
            res.status(401).json({ message: "Invalid ID" });
            return;
        }
        await User.updateOne({ _id: user_id }, { $push: { address: address } });
        res.status(200).json({Address : users.address});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};