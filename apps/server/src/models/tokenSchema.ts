import { Schema, model } from "mongoose";
import { VerificationToken } from "../interfaces";

const verificationTokenSchema = new Schema<VerificationToken>({
  token: { type: String, unique: true },
  userId: String,
  user: { type: Schema.Types.ObjectId, ref: "EditorUser" },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: Date.now() + 600000 },
});

const VerifyModel = model<VerificationToken>(
  "VerificationToken",
  verificationTokenSchema
);

export default VerifyModel;
