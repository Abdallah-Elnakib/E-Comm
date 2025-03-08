import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        const data = { email, password };
        const response = await fetch(`${process.env.AUTHSERVER}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            res.status(response.status).json(errorData);
            return;
        }

        const responseData = await response.json();
        res.status(200).json(responseData);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};