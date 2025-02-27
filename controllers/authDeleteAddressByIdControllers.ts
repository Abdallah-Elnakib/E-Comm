import { Request, Response } from 'express';
import { User } from '../models/userModel';

export const deleteAddressById = async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params;
    const { address_id } = req.body;
    try {
        const user = await User.findById(user_id);
        if (!user) {
            res.status(401).json({ message: "Invalid User ID" });
            return;
        }
        if (!address_id) {
            res.status(400).json({ message: "Address ID is required" });
            return;
        }
        const index = address_id - 1;  
        if (index < 0 || index >= user.address.length) {
            res.status(401).json({ message: "Invalid Address ID" });
            return;
        }
        user.address.splice(index, 1);
        await user.save();
        res.status(200).json({ message: "Address deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
