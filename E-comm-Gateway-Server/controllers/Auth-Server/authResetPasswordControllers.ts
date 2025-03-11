import { Request, Response } from 'express';
import { fetchAuthServer } from '../../utils/FetchAuthServer';

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const {newassword, confirmpassword} = req.body;
        const token = req.query.token
        if (!newassword || !confirmpassword || !token) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const response = await fetchAuthServer(`${process.env.AUTHSERVER}/api/auth/reset-password?token=${token}`, 'POST', { newassword, confirmpassword });
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
}