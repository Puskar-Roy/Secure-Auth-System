import { v4 as uuidv4 } from "uuid";
import config from "../config/config";
import nodemailer from "nodemailer";
import UserModel from "../models/userSchema";
import VerifyModel from "../models/tokenSchema";

export const sendEmailwithNodemailer = async (userId: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.EMAIL,
      pass: config.PASSWORD,
    },
  });

  try {
    const exists = await UserModel.findById({ _id: userId });
    if (!exists) throw new Error("User not found");
    const token = uuidv4();
    const tokenExpiresAt = new Date();
    tokenExpiresAt.setMinutes(tokenExpiresAt.getMinutes() + 10);
    const tokenn = await VerifyModel.create({
      token: token,
      userId: exists?._id,
      expiresAt: tokenExpiresAt,
    });
    const verificationLink = `${config.BACKENDURL}/api/v0.1/auth/verify-email/${exists?._id}/?token=${token}`;
    const mailOptions = {
      from: "puskarroy300@gmail.com",
      to: exists.email,
      subject: "Verify Your Email",
      html: ` <p>Hey ${exists.name} 👋, Thank you for signing up! To complete the authentication process and access your account, please verify your email address by clicking the link below - </p>
  <p><a href="${verificationLink}" style="color: #007bff; text-decoration: none;">Verify Email Address</a></p>
  <h4 style="font-family: Arial, sans-serif;">Please note that this link will expire in 10 minutes. If you did not request this verification, you can safely ignore this email.</h4>
  <h3 style="font-family: Arial, sans-serif;">Thank you,<br>Puskar Roy</h3>`,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};