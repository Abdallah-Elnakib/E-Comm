import { Request, Response } from 'express';


export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie('connect.sid');
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}