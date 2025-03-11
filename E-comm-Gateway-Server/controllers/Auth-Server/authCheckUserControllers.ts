import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const checkUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const  response = await fetch(`${process.env.AUTHSERVER}/api/auth/check-user-auth`);
        res.status(response.status).json(await response.json());
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}