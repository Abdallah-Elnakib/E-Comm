import { User } from '../models/userModel';
import { Request, Response } from 'express';

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    try {
        const getUser = await User.findById(id);
        if (!getUser) {
            res.status(401).json({ message: "Invalid ID" });
            return;
        }
        res.status(200).json({ UserData: getUser });
        return;
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};