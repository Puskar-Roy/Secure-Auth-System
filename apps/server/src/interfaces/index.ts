import { Document, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  verificationTokens: VerificationToken[];
  loginHistory?: LoginHistory[];
  loggedInDevices: LoggedInDevice[];
  isVerified: boolean;
  role: string;
}

export interface VerificationToken extends Document {
  _id: string;
  token: string;
  userId: string; 
  createdAt: Date;
  expiresAt: Date;
  user: User;
}
export interface LoginHistory extends Document {
  userId: Schema.Types.ObjectId;
  deviceInfo: string;
  os:string;
  timestamp: Date;
  action?:string;
}


export interface LoggedInDevice {
  deviceId: string;
  deviceName: string;
  lastLogin: Date;
}


export interface TokenData {
  _id: string;
  iat: number;
  exp: number;
}