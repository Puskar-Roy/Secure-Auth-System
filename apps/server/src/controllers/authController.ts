import { Request, Response } from "express";
import asyncHandler from "../util/catchAsync";
import UserModel from "../models/userSchema";
import VerifyModel from "../models/tokenSchema";
import bcrypt from "bcryptjs";
import validator from "validator";
import { createToken } from "../util/utils";
import { sendEmailwithNodemailer } from "../util/sendEmail";
import { sendLoginOTPwithNodemailer } from "../util/sendOTP";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw Error("Email is not valid");
    }
    if (user.isVerified === false) {
      await sendEmailwithNodemailer(user._id);
      return res.status(200).json({
        message:
          "Email is not Verified, Verification email sent to your email!",
        success: false,
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Invalid credentials");
    }
    await sendLoginOTPwithNodemailer(user._id);
    res.status(200).json({
      message: "OTP Send successfull!",
      success: true,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  try {
    const exists = await UserModel.findOne({ email });
    if (exists) {
      throw Error("Email already in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await UserModel.create({ name, email, password: hash });
    await sendEmailwithNodemailer(user._id);
    return res.status(200).json({
      message: "Verification email sent !",
      success: true,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: error, success: false });
  }
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.query;
  const { id } = req.params;
  if (!token || typeof token !== "string")
    return res.status(400).send("Token not provided or invalid");
  try {
    const user = await UserModel.findById({ _id: id });
    if (!user) {
      throw Error("User Not Found!");
    }
    const verificationToken = await VerifyModel.findOne({
      token: token,
      userId: user._id,
    });
    if (!verificationToken) return res.status(404).send("Invalid token");
    if (verificationToken.expiresAt < new Date()) {
      await VerifyModel.deleteOne({ _id: verificationToken._id });
      throw Error("Token has expired");
    }
    await UserModel.updateOne(
      { _id: verificationToken.userId },
      { $set: { isVerified: true } }
    );
    await VerifyModel.deleteOne({ token });
    return res.status(200).send("Email verified successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Email verified Failed");
  }
});
