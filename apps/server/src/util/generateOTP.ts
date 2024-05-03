import { randomInt } from "crypto";

export const generateOTP = (): string => {
  const otp = randomInt(100000, 1000000);
  return otp.toString();
};
