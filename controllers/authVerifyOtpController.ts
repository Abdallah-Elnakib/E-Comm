import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { Otp } from '../models/otpSchema'; // Assuming you have an OTP model
import mailSender from '../utils/mailSender';


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

// Controller function to handle OTP sending
export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    // Generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save the OTP to the database
    const otpDocument = new Otp({ email, otp });
    await otpDocument.save();

    // Send the OTP via email
    await sendVerificationEmail(email, otp);

    res.status(200).json({ message: "OTP sent successfully" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};