import { Document } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  profilePic: string;
  verificationTokens: VerificationToken[];
  isVerified: boolean;
}

export interface VerificationToken extends Document {
  _id: string;
  token: string;
  userId: string; 
  createdAt: Date;
  expiresAt: Date;
  user: User;
}