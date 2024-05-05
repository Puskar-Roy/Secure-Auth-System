import { Schema, model } from "mongoose";
import { User } from "../interfaces";

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verificationTokens: [
      { type: Schema.Types.ObjectId, ref: "VerificationToken" },
    ],
    loginHistory: [{ type: Schema.Types.ObjectId, ref: "LoginHistory" }],
    loggedInDevices: [
      {
        deviceId: { type: String, required: true },
        deviceName: { type: String, required: true },
        lastLogin: { type: Date, required: true },
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "User",
    },
  },
  { timestamps: true }
);
const UserModel = model<User>("EditorUser", userSchema);

export default UserModel;
