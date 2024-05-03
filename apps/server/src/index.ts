import express, { Express, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import hpp from 'hpp';
import config from "./config/config";
import errorHandler from "./middleware/errorHandler";
import CheckError from "./util/checkError";
import { limiter , corsOptions , socketOptions } from "./util/utils";

const app: Express = express();

app.use(limiter);
app.use(config.DEV_ENV === "PROD" ? cors(corsOptions) : cors()); 
app.set("trust proxy", config.DEV_ENV === "PROD" ? true : false);
app.use(express.json());
app.use(helmet());
app.use(hpp());
app.use(errorHandler);
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});
import "./database/connectDb";
const server = http.createServer(app);
const io = new Server(server,socketOptions);

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "API IS WORKING 🥳" });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new CheckError(`Can't find ${req.originalUrl} on this server!`, 404));
});



io.on("connection", (socket) => {
  socket.on("join", ({ name, roomId, pic }) => {
   
  });
  socket.on("disconnecting", () => {
   
  });
});



server.listen(config.PORT, () => {
  console.log(`[⚡] Server Is Running on ${config.BACKENDURL}`);
});

export default app;
