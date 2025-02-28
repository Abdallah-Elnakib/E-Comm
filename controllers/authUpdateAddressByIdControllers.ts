import { Request, Response } from 'express';
import { User } from '../models/userModel';

export const updateAddress = async (req: Request, res: Response): Promise<void> => {
    const {user_id} = req.params;
    const {addressNumber, address} = req.body;
    try {
        const user = await User.findById({ _id: user_id });
        if (!user) {
            res.status(401).json({ message: "Invalid User ID" });
            return;
        }
        const { street, city, state, zip } = address;
        if (!street || !city || !state || !zip) {
            res.status(400).json({ message: "All address fields are required" });
            return;
        }
        const addressIndex = addressNumber - 1;
        if (addressIndex < 0 || addressIndex >= user.address.length) {
            res.status(401).json({ message: "Invalid Address Number" });
            return;
        }
        await User.findByIdAndUpdate({ _id: user_id }, { $set: { [`address.${addressIndex}`]: address } });
        const addressOfUser = await User.findById({ _id: user_id });
        res.status(200).json({ Address: addressOfUser?.address });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};