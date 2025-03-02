import { Request, Response } from 'express';
import { User } from '../models/userModel';
import mailSender from '../utils/mailSender';
import jwt from 'jsonwebtoken';

async function sendVerificationEmail(email: string, token: string) {
  try {
    const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}`;
    const mailResponse = await mailSender(
      email,
      "Reset Password",
      `<h1>Reset Your Password</h1>
       <p>Click the button below to reset your password:</p>
       <a href="${resetPasswordUrl}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: blue; text-decoration: none; border-radius: 5px;">Reset Password</a>`
    );

} catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

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

    await sendVerificationEmail(email, token);

    res.status(200).json({ message: "Reset password email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};