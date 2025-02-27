import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';


export const signupUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, username, email, address, password } = req.body;
        if (!firstName || !lastName || !username || !email || !address || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        if (password.length < 8) {
            res.status(400).json({message : "Password Must Be More Than 8"});
            return; 
        }
        const findemail = await User.findOne({ email });
        const findusername = await User.findOne({username})
        if (findemail || findusername) {
            res.status(401).json({ message: "User already exists" });
            return;
        }
        const hashPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            firstName,
            lastName,
            username,
            email,
            address,
            password : hashPassword,
            position: "user"
        })
        const ACCESS_TOKEN = jwt.sign({ userId: user._id, role: user.position }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "15m" });
        const REFRESH_TOKEN = jwt.sign({ userId: user._id, role: user.position }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "7d" });
        res.cookie("jwt", REFRESH_TOKEN, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({ ACCESS_TOKEN });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};