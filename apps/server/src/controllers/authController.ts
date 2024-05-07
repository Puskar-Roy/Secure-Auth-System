import { Request, Response } from "express";
import asyncHandler from "../util/catchAsync";
import UserModel from "../models/userSchema";
import VerifyModel from "../models/tokenSchema";
import LoginHistoryModel from "../models/loginHistorySchema";
import bcrypt from "bcryptjs";
import validator from "validator";
import { createToken } from "../util/utils";
import { sendEmailwithNodemailer } from "../util/sendEmail";
import { sendLoginOTPwithNodemailer } from "../util/sendOTP";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not valid!" });
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

export const verifyLoginOTP = asyncHandler(
  async (req: Request, res: Response) => {
    const { token } = req.query;
    const { id } = req.params;
    const { deviceInfo, os, action } = req.body;
    if (!token || typeof token !== "string")
      return res.status(400).send("Token not provided or invalid");
    try {
      const user = await UserModel.findOne({ email: id });
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

      const existingDeviceIndex = user.loggedInDevices.findIndex(
        (device) => device.deviceName === `${deviceInfo} ${os}`
      );

      if (existingDeviceIndex !== -1) {
        user.loggedInDevices[existingDeviceIndex].lastLogin = new Date();
      } else {
        user.loggedInDevices.push({
          deviceId: user._id,
          deviceName: `${deviceInfo} ${os}`,
          lastLogin: new Date(),
        });
      }

      await user.save();
      const jwttoken = createToken(user._id);
      await LoginHistoryModel.create({
        os,
        deviceInfo,
        userId: user._id,
        action,
      });

      return res.status(200).json({
        message: "Login successful!",
        success: true,
        token: jwttoken,
        email: user.email,
        id: user._id,
        name: user.name,
        role: user.role,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send("Email verified Failed");
    }
  }
);

export const getLoginHistory = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const loginHistory = await LoginHistoryModel.find({ userId });

      res.status(200).json({
        loginhistory: loginHistory,
        loggedInDevices: user.loggedInDevices,
      });
    } catch (error) {
      console.error("Error fetching login history:", error);
      res.status(500).json({ message: "Failed to fetch login history" });
    }
  }
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { deviceInfo, os, action } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const deviceIndex = user.loggedInDevices.findIndex(
      (device) => device.deviceName === `${deviceInfo} ${os}`
    );
    if (deviceIndex === -1) {
      return res.status(404).json({ message: "Device not found for the user" });
    }
    user.loggedInDevices.splice(deviceIndex, 1);

    await user.save();

    await LoginHistoryModel.create({
      os,
      deviceInfo,
      userId: user._id,
      action,
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const verifyUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is missing in the request" });
    }
    const { deviceInfo, os } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const deviceIndex = user.loggedInDevices.findIndex(
      (device) => device.deviceName === `${deviceInfo} ${os}`
    );

    if (deviceIndex === -1) {
      return res
        .status(200)
        .json({ message: "User is not logged in from the specified device" });
    }

    // Device is present, user is logged in from this device
    return res
      .status(200)
      .json({ message: "User is logged in from the specified device" });
  } catch (error) {
    console.error("Verify user error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current and new password are required" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    user.password = hash;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
