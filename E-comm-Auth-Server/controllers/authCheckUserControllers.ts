import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const checkUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.session?.refreshToken;
        console.log('fetching...................');
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            if (decoded && typeof decoded === 'object' && 'userInfo' in decoded) {
                res.status(200).json({ message: (decoded as any).userInfo });
                return;
            } else {
                res.status(401).json({ message: "Unauthorized" });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}