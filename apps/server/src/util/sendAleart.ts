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

  const changePassword = `${config.FRONTENDURL}/change-password`;
  const signOut = `${config.FRONTENDURL}`;

  try {
    const user = await UserModel.findById({ _id: userId });
    if (!user) throw new Error("User not found");

    const mailOptions = {
      from: "puskarroy300@gmail.com",
      to: user.email,
      subject: "Unauthorized Login Detected on Your Account",
      html: ` <p>Dear ${user.name} 👋, Our system has detected a login to your account that appears to be unauthorized. If this login was not initiated by you, we strongly recommend changing your password immediately to secure your account.</p>
      <p>You Can Always Sign Out Other Devices <a href="${signOut}" style="color: #007bff; text-decoration: none;">here</a> </p>
      <p>You Can Also Change Your <a href="${changePassword}" style="color: #007bff; text-decoration: none;">Password</a> </p>
  <h3 style="font-family: Arial, sans-serif;">Thank you,<br>Puskar Roy</h3>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
