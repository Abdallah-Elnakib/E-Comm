import { Request, Response } from 'express';
import { User } from '../models/userModel';

export const deleteAddressById = async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params;
    const { addressNumber } = req.body;

    try {
        const user = await User.findById(user_id);
        if (!user) {
            res.status(401).json({ message: "Invalid User ID" });
            return;
        }

        if (addressNumber === undefined) {
            res.status(400).json({ message: "Address Number is required" });
            return;
        }

        const addressIndex = addressNumber - 1;
        if (addressIndex < 0 || addressIndex >= user.address.length) {
            res.status(401).json({ message: "Invalid Address Number" });
            return;
        }

        if (user.address.length <= 1) {
            res.status(401).json({ message: "The address cannot be deleted before adding another address." });
            return;
        }

        user.address.splice(addressIndex, 1);
        await user.save();

        res.status(200).json({ message: "Address deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};