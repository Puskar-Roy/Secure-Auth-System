import { Document, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  profilePic: string;
  verificationTokens: VerificationToken[];
  loginHistory?: LoginHistory[];
  loggedInDevices: LoggedInDevice[];
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