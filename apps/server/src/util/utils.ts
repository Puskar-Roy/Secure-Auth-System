import rateLimit from "express-rate-limit";
import { CorsOptions } from "cors";
import config from "../config/config";
import jwt from "jsonwebtoken";


export const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

const whitelist = ["http://localhost:3000", "https://myauthhub.vercel.app"];
export const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin)
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
  },
};


export const socketOptions = {
  cors: {
    origin: `${config.FRONTENDURL}`,
    credentials: true,
    methods: ["GET", "POST"],
  },
}



export const createToken = (_id: string) => {
  return jwt.sign({ _id: _id }, config.JWT_SECRET, {
    expiresIn: config.JWT_COOKIE_EXPIRES_IN,
  });
};