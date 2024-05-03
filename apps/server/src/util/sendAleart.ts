import config from "../config/config";
import nodemailer from "nodemailer";
import { generateOTP } from "./generateOTP";
import UserModel from "../models/userSchema";
import VerifyModel from "../models/tokenSchema";

export const sendAleart = async (userId: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.EMAIL,
      pass: config.PASSWORD,
    },
  });

  try {
    const user = await UserModel.findById({ _id: userId });
    if (!user) throw new Error("User not found");
    
    const mailOptions = {
      from: "puskarroy300@gmail.com",
      to: user.email,
      subject: "Unauthorized Login Detected on Your Account",
      html: ` <h2>Dear ${user.name} 👋, Our system has detected a login to your account that appears to be unauthorized. If this login was not initiated by you, we strongly recommend changing your password immediately to secure your account.</h2>

  <h3 style="font-family: Arial, sans-serif;">Thank you,<br>Puskar Roy</h3>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
