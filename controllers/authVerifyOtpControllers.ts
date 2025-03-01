import { Request, Response } from 'express';
import { Otp } from '../models/otpSchema'; 
import { checkMail } from '../utils/CheckMail';


export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            res.status(400).json({ message: "Email and OTP are required" });
            return;
        }

        const isEmailValid = await checkMail(email);
    
        if (isEmailValid === 'UNDELIVERABLE') {
            res.status(400).json({ message: "Invalid email address" });
            return;
        }

        const CheckOtpInDB = await Otp.findOne({ email });
        if (!CheckOtpInDB) {
            res.status(400).json({ message: "OTP not found" });
            return;
        }
        if (CheckOtpInDB.otp !== otp) {
            res.status(400).json({ message: "Invalid OTP" });
            return;
        }
        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }

}