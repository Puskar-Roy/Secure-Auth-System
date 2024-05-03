import express, { Express, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import hpp from "hpp";
import config from "./config/config";
import errorHandler from "./middleware/errorHandler";
import CheckError from "./util/checkError";
import { limiter, corsOptions, socketOptions } from "./util/utils";
import authRoutes from "./routes/authRoutes";

const app: Express = express();

app.use(express.json());
app.use(limiter);
app.use(config.DEV_ENV === "PROD" ? cors(corsOptions) : cors());
app.set("trust proxy", config.DEV_ENV === "PROD" ? true : false);
app.use(helmet());
app.use(hpp());
app.use(errorHandler);
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});
import "./database/connectDb";
const server = http.createServer(app);
const io = new Server(server, socketOptions);

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "API IS WORKING 🥳" });
});

app.use("/api/v0.1/auth", authRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new CheckError(`Can't find ${req.originalUrl} on this server!`, 404));
});




interface Device {
  socketId: string;
  device: string;
}

let activeUsers = 0;
const loginHistory: { [userId: string]: Device[] } = {};

io.on("connection", (socket) => {
  activeUsers++;
  io.emit("activeUsers", activeUsers);
  console.log("New user connected. Active users:", activeUsers);

  socket.on("login", (userId: string) => {
    if (!loginHistory[userId]) {
      loginHistory[userId] = [];
    }

    const existingDevice = loginHistory[userId].find(
      (device) => device.socketId !== socket.id
    );
    if (existingDevice) {
      // Send a message to the existing device
      io.to(existingDevice.socketId).emit(
        "duplicateLogin",
        "You have logged in from another device."
      );
    }

    loginHistory[userId].push({ socketId: socket.id, device: "phone" });
    console.log("User logged in. Login history:", loginHistory[userId]);
  });

  socket.on("disconnect", () => {
    activeUsers--;
    io.emit("activeUsers", activeUsers);
    console.log("User disconnected. Active users:", activeUsers);
  });
});








server.listen(config.PORT, () => {
  console.log(`[⚡] Server Is Running on ${config.BACKENDURL}`);
});

export default app;
