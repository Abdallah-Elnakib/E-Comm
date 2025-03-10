import { Request, Response } from 'express';
import { Otp } from '../models/otpSchema'; 
import mailSender from '../utils/mailSender';
import { checkMail } from '../utils/CheckMail';
import { z } from 'zod';



async function sendVerificationEmail(email: string, otp: string) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      `<h1>Please confirm your OTP</h1>
       <p>Here is your OTP code: ${otp}</p>`
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

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

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpDocument = new Otp({ email, otp });
    await otpDocument.save();

    await sendVerificationEmail(email, otp);

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
