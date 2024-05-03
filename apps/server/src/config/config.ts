import dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: process.env.PORT || 8080,
  MONGOURI: process.env.MONGOURI || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN,
  DEV_ENV: process.env.DEV_MODE,
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
  BACKENDURL: process.env.BACKENDURL,
  FRONTENDURL: process.env.FRONTENDURL,
};

export default config;
