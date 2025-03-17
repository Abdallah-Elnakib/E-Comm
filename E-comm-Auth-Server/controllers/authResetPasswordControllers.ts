import { Request, Response } from 'express';
import { User } from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const {token} = req.query;
        const {newassword, confirmpassword} = req.body;
        if (!token || !newassword || !confirmpassword) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        if (newassword !== confirmpassword) {
            res.status(400).json({ message: "Passwords do not match" });
            return;
        }

        const user = await User.findOne({ resetPasswordToken: token });
        if (!user) {
            res.status(400).json({ message: "Invalid token" });
            return;
        }

        jwt.verify(user.resetPasswordToken as string, process.env.RESET_PASSWORD_SECRET as string, (err, decoded) => {
            if (err) {
                res.status(400).json({ message: "Invalid token" });
                return;
            }
        });
        const hashPassword = await bcrypt.hash(newassword, 10);

        user.password = hashPassword;
        user.resetPasswordToken = undefined;
        await user.save();
        res.status(200).json({ message: "Password reset successfully" });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}