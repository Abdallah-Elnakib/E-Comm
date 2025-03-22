import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
export const checkRequestAuthentication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if ( req.headers.username === process.env.CHECK_REQUEST_AUTHENTICATION_USERNAME && req.headers.password === process.env.CHECK_REQUEST_AUTHENTICATION_PASSWORD) {
            next();
        } else if (`${req.protocol}://${req.get('host')}` === process.env.ENDPOINTAUTH) {
            next();
        } else {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}
