import { Request, Response } from 'express';
import { fetchAuthServerWithoutBody } from '../../utils/FetchAuthServer';

export const getAllAddress = async (req: Request, res: Response): Promise<void> => {
    try {
        const {user_id} = req.params;
        if (!user_id) {
            res.status(400).json({ message: "User id is required" });
            return;
        }
        const response = await fetchAuthServerWithoutBody(`${process.env.AUTHSERVER}/api/auth/address/get-all/${user_id}`, 'GET');
        if ('status' in response) {
            const responseData = await response.json();
            res.status(response.status).json(responseData);
            return;
        } else {
            res.status(500).json({ message: "Error from auth server" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}