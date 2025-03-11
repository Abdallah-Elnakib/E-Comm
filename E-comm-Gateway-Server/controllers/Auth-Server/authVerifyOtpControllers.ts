import { Request, Response } from 'express';
import {fetchAnotherServer} from '../../utils/FetchAnotherServer';

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            res.status(400).json({ message: "Email and OTP are required" });
            return;
        }

        const response = await fetchAnotherServer(`${process.env.AUTHSERVER}/api/auth/verify-otp`, 'POST', { email, otp });
        if ('status' in response) {
            const responseData = await response.json();
            res.status(response.status).json(responseData);
        } else {
            res.status(500).json({ message: "Error from auth server" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }

}