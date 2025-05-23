import { Request, Response } from 'express';
import { Otp } from '../models/otpSchema'; 
import { checkMail } from '../utils/CheckMail';
import { z } from 'zod';
import {sendEmail} from '../config/rabbitmq';


export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const isEmailValid = await checkMail(email);
    if (isEmailValid === 'UNDELIVERABLE') {
      res.status(400).json({ message: "Invalid email address" });
      return;
    }

    const CheckOtpInDB = await Otp.findOne({ email });
    if (CheckOtpInDB) {
      res.status(400).json({ message: "OTP already sent please wait for 1 minutes and try again" });
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpDocument = new Otp({ email, otp });
    await otpDocument.save();

    await sendEmail({"message":"Send-OTP",email, otp});

    res.status(200).json({ message: "OTP sent successfully" });
    
  } catch (error) {
    
    if (error instanceof z.ZodError) {
      const zodError = error as z.ZodError;
      res.status(400).json({ message: zodError.errors });
      
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
