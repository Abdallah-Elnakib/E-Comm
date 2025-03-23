import mailSender from './mailSender';



export async function sendMailRating_5(email: string) {
    try {
      const mailResponse = await mailSender(
        email,
        "Thank you for your product rating.",
        `<h1>Thank You 😁</h1>
         <p>Thank you for rating our products. I hope you liked them. Follow us for more offers and new products.</p>`
      );
      console.log("Email sent successfully: ", mailResponse);
    } catch (error) {
      console.log("Error occurred while sending email: ", error);
      throw error;
    }
}

export async function sendMailRating_3(email: string) {
    try {
      const mailResponse = await mailSender(
        email,
        "Thank you for your product rating.",
        `<h1>Thank You 😌</h1>
         <p>Thank you for your evaluation. We are sorry if the service did not satisfy you well. 
         We will try to improve the level of service so that you are completely satisfied. Thank you for being with us and for your understanding.</p>`
      );
      console.log("Email sent successfully: ", mailResponse);
    } catch (error) {
      console.log("Error occurred while sending email: ", error);
      throw error;
    }
}


export async function sendMailRating_1(email: string) {
    try {
      const mailResponse = await mailSender(
        email,
        "Thank you for your product rating.",
        `<h1>We apologize for the inconvenience.😓</h1>
         <p>We are sorry if you did not like the products and if there was any problem, please do not hesitate to contact us to help you solve the problem or prevent this mistake from happening again. Thank you for your understanding. 
         We are happy to have you with us..</p>`
      );
      console.log("Email sent successfully: ", mailResponse);
    } catch (error) {
      console.log("Error occurred while sending email: ", error);
      throw error;
    }
}

export async function sendVerificationEmail(email: string, token: string) {
  try {
    const resetPasswordUrl = `http://auth-service:3000/reset-password?token=${token}`;
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

export async function sendOtp(email: string, otp: string) {
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