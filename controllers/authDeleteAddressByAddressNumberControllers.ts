import { Request, Response } from 'express';
import { User } from '../models/userModel';

export const deleteAddressById = async (req: Request, res: Response): Promise<void> => {
    const { user_id } = req.params;
    const { addressNumber }: { addressNumber: 'address1' | 'address2' | 'address3' } = req.body;
    try {
        const user = await User.findById(user_id);
        if (!user) {
            res.status(401).json({ message: "Invalid User ID" });
            return;
        }
        if (!addressNumber) {
            res.status(400).json({ message: "Address Numeber is required" });
            return;
        }
        if (addressNumber !== 'address1' && addressNumber !== 'address2' && addressNumber !== 'address3') {
            res.status(401).json({ message: "Invalid Address Number" });
            return;
        }
        await user.address[addressNumber].remove();
        await user.save();
        res.status(200).json({ message: "Address deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
