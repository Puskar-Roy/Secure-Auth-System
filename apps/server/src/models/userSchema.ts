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
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const UserModel = model<User>("EditorUser", userSchema);

export default UserModel;
