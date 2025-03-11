import { Request, Response } from 'express';
import { fetchAnotherServer } from '../../utils/FetchAnotherServer';

export const deleteAddressByAddressNumber = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id } = req.params;
        const { addressNumber } = req.body;
        if (!addressNumber) {
            res.status(400).json({ message: "Address number is required" });
            return;
        }
        if (!user_id) {
            res.status(400).json({ message: "User id is required" });
            return;
        }
        const response = await fetchAnotherServer(`${process.env.AUTHSERVER}/api/auth/address/delete/${user_id}`, 'DELETE', {addressNumber});
        if ('status' in response) {
            const responseData = await response.json();
            res.status(response.status).json(responseData);
        } else {
            res.status(500).json({ message: "Error from auth server" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};