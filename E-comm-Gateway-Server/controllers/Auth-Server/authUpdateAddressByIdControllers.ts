import { Request, Response } from 'express';
import { fetchAnotherServer } from '../../utils/FetchAnotherServer';

export const updateAddress = async (req: Request, res: Response): Promise<void> => {
    const {user_id} = req.params;
    const {addressNumber, address} = req.body;
    if (!user_id) {
        res.status(400).json({ message: "User id is required" });
        return;
    }
    if (!addressNumber || !address) {
        res.status(400).json({ message: "Address number and address are required" });
        return;
    }
    const { street, city, state, zip } = address;
        if (!street || !city || !state || !zip) {
            res.status(400).json({ message: "All address fields are required" });
            return;
        }
    const response = await fetchAnotherServer(`${process.env.AUTHSERVER}/api/auth/address/update-address/${user_id}`, 'PUT', { addressNumber, address });
    if ('status' in response) {
        const responseData = await response.json();
        res.status(response.status).json(responseData);
        return;
    } else {
        res.status(500).json({ message: "Error from auth server" });
    }
}