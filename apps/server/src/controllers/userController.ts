import { Request, Response } from "express";
import asyncHandler from "../util/catchAsync";
import UserModel from "../models/userSchema";

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ ...user.toJSON(), password: undefined });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
