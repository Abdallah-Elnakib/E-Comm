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
            res.status(400).json({ message: "Password must be more than 8 characters" });
            return;
        }
        const { address1, address2, address3} = address;
        
        if (!address1) {
            res.status(400).json({ message: "All address fields are required" });
            return;
        }
        const {street, city, state, zip } = address1;
        if (!street || !city || !state || !zip) {
            res.status(400).json({ message: "All address fields are required" });
            return;
        }
        if (address2 && (!address2.street || !address2.city || !address2.state || !address2.zip)) {
            res.status(400).json({ message: "All address fields are required" });
            return;
        }
        if (address3 && (!address3.street || !address3.city || !address3.state || !address3.zip)) {
            res.status(400).json({ message: "All address fields are required" });
            return;
        }
        const findEmail = await User.findOne({ email });
        const findUsername = await User.findOne({ username });
        if (findEmail || findUsername) {
            res.status(401).json({ message: "User already exists" });
            return;
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            username,
            email,
            address: address,
            password: hashPassword,
            position: "user"
        });
        const ACCESS_TOKEN = jwt.sign({ userId: user._id, role: user.position }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "15m" });
        const REFRESH_TOKEN = jwt.sign({ userId: user._id, role: user.position }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "7d" });
        res.cookie("jwt", REFRESH_TOKEN, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.status(201).json({ ACCESS_TOKEN });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};