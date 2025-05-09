import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';

declare module 'express-session' {
    interface SessionData {
        refreshToken: string;
    }
}
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        const user = await User.findOne({ email });
        if (!user || !user.password) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        const ACCESS_TOKEN = jwt.sign({userInfo:{ userId: user._id, role: user.position }}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "15m" });
        const REFRESH_TOKEN = jwt.sign({userInfo:{ userId: user._id, role: user.position }}, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "7d" });
        
        req.session.refreshToken = REFRESH_TOKEN;
        
        res.status(200).json({ ACCESS_TOKEN, REFRESH_TOKEN });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};