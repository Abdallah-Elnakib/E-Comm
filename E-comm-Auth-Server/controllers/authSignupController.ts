import { Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel';
import { checkMail } from '../utils/CheckMail';

export const signupUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, username, email, addresses, password } = req.body;
        if (!firstName || !lastName || !username || !email || !addresses || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        if (password.length < 8) {
            res.status(400).json({ message: "Password must be more than 8 characters" });
            return;
        }
        if (!Array.isArray(addresses) || addresses.length === 0) {
            res.status(400).json({ message: "Addresses must be a non-empty array" });
            return;
        }
        for (const address of addresses) {
            const { street, city, state, zip } = address;
            if (!street || !city || !state || !zip) {
                res.status(400).json({ message: "All address fields are required" });
                return;
            }
        }
        const findEmail = await User.findOne({ email });
        const findUsername = await User.findOne({ username });

        if (findEmail || findUsername) {
            res.status(401).json({ message: "User already exists" });
            return;
        }
        const isEmailValid = await checkMail(email);

        if (isEmailValid === 'UNDELIVERABLE') {
            res.status(400).json({ message: "Invalid email address" });
            return;
        }
        
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            username,
            email,
            address: addresses,
            password: hashPassword,
            position: "user"
        });
        const ACCESS_TOKEN = jwt.sign({ userId: user._id, role: user.position }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "15m" });
        const REFRESH_TOKEN = jwt.sign({ userId: user._id, role: user.position }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "7d" });
        
        req.session.refreshToken = REFRESH_TOKEN;
        
        res.status(201).json({ ACCESS_TOKEN, REFRESH_TOKEN });
    
    } catch (error) {

        if (error instanceof z.ZodError) {
          res.status(400).json({ message: (error as z.ZodError).errors });
          
        } else {
          console.error(error);
          res.status(500).json({ message: "Internal server error" });
        }
    }
};