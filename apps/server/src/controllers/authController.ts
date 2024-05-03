import { Request, Response } from "express";
import asyncHandler from "../util/catchAsync";
import UserModel from "../models/userSchema";
import VerifyModel from "../models/tokenSchema";
import bcrypt from "bcryptjs";
import validator from "validator";
import { createToken } from "../util/utils";
// import { sendEmailwithNodemailer } from "../util/sendEmail";
// import { sendOTPwithNodemailer } from "../util/sendOTP";



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
    //   await sendEmailwithNodemailer(user._id);
      return res.status(400).json({
        message:
          "Email is not Verified, Verification email sent to your email!",
        success: false,
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Invalid credentials");
    }
    // const token = createToken(user._id);
    // Send a OTP for user to login
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