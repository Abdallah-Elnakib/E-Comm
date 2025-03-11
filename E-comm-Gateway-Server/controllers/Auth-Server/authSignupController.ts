import { Request, Response } from 'express';
import { fetchAnotherServer } from '../../utils/FetchAnotherServer';

export const signupUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, username, email, addresses, password } = req.body;
        if (!firstName || !lastName || !username || !email || !addresses || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        
        const data = {
            firstName,
            lastName,
            username,
            email,
            addresses,
            password
        };  
        const response = await fetchAnotherServer(`${process.env.AUTHSERVER}/api/auth/signup`, 'POST', data);

        if ('status' in response) {
            const responseData = await response.json();
            req.session.refreshToken = responseData.REFRESH_TOKEN;
            res.status(response.status).json({"Access Token": responseData.ACCESS_TOKEN});
        } else {
            res.status(500).json({ message: "Error from auth server" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};