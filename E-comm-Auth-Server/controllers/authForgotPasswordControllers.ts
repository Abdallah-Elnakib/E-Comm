import { Request, Response } from 'express';
import { User } from '../models/userModel';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../config/rabbitmq'; 

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ message: "Email is required" });
            return;
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Email not found" });
            return;
        }

        const token = jwt.sign({ userId: user._id }, process.env.RESET_PASSWORD_SECRET as string, { expiresIn: '1h' });

        await User.updateOne({ email }, { $set: { resetPasswordToken: token } });

        await sendEmail({"message": "Forgot-Password", "email": email, "token": token}); 

        res.status(200).json({ message: "Reset password email sent successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};