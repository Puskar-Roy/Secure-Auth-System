import rateLimit from "express-rate-limit";
import { CorsOptions } from "cors";
import config from "../config/config";

export const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

const whitelist = ["http://localhost:3000"];
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