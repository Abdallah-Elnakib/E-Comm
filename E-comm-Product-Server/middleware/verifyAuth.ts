import { Request, Response, NextFunction } from 'express';
import {sendToQueue, receivedFromQueue} from '../config/rabbitmq';

export const verifyAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
        console.log("🔐 Verifying User Authentication...");
        await sendToQueue('auth', 'user sent a request to Product-Server');
        await receivedFromQueue('response').then((data) => {
        console.log(data);  
        if (data == "❌ Unauthorized User") {
            return res.status(401).json({ message: data });
        }
        next();
        }).catch((error) => {
            console.error("❌ Error in verifyAuth middleware:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        });
        console.log("🔓 User Authenticated Successfully!");
    } catch (error) {
        console.error("❌ Error in verifyAuth middleware:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};