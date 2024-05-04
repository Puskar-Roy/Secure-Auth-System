import { Schema, model } from "mongoose";
import { LoginHistory } from "../interfaces";

const loginHistorySchema = new Schema<LoginHistory>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "EditorUser",
    required: true,
  },
  deviceInfo: {
    type: String,
    required: true,
  },
  os: { type: String, required: true },
  action: { type: String, required: true },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const LoginHistoryModel = model<LoginHistory>(
  "LoginHistory",
  loginHistorySchema
);

export default LoginHistoryModel;
