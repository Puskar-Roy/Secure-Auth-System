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
import { sendAleart } from "./util/sendAleart";

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








// =========================================================================
// let activeUsers = 0;
// const loggedInUserIds: string[] = [];

// io.on("connection", (socket) => {
//   activeUsers++;
//   io.emit("activeUsers", activeUsers);
//   console.log("New user connected. Active users:", activeUsers);

//   socket.on("login", async (userId: string) => {
//     console.log("login event start for userId:", userId);

//     if (loggedInUserIds.includes(userId)) {
//       console.log("duplicateLogin event start for userId:", userId);
//       await sendAleart(userId);
//     } else {
//       loggedInUserIds.push(userId);

//       console.log("User logged in. Active userIds:", loggedInUserIds);
//     }
//   });

//   socket.on("disconnect", () => {
//     activeUsers--;
//     io.emit("activeUsers", activeUsers);
//     console.log("User disconnected. Active users:", activeUsers);

//     const index = loggedInUserIds.indexOf(socket.id);
//     if (index !== -1) {
//       loggedInUserIds.splice(index, 1);
//     }
//   });
// });

// ================================================================================


interface ConnectedUser {
  socketId: string;
}

let activeUsers = 0;
const connectedUsers: { [userId: string]: ConnectedUser } = {}; // Typed object with userId as key and socketId as value
const loggedInUserIds: string[] = [];

io.on("connection", (socket) => {
  activeUsers++;
  io.emit("activeUsers", activeUsers);
  console.log("New user connected. Active users:", activeUsers);

socket.on("login", async (userId: string) => {
  console.log("login event start for userId:", userId);

  if (loggedInUserIds.includes(userId)) {
    console.log("duplicateLogin event start for userId:", userId);
    await sendAlert(userId);
  } else {
    connectedUsers[userId] = { socketId: socket.id }; // Store socket ID for the user
    loggedInUserIds.push(userId);

    console.log("User logged in. Active userIds:", loggedInUserIds);
  }
});

socket.on("disconnect", () => {
  activeUsers--;
  io.emit("activeUsers", activeUsers);
  console.log("User disconnected. Active users:", activeUsers);

  const userId = Object.keys(connectedUsers).find(
    (id) => connectedUsers[id].socketId === socket.id
  );
  if (userId) {
    console.log("Removing user from connectedUsers:", userId);
    delete connectedUsers[userId];
    const index = loggedInUserIds.indexOf(userId);
    if (index !== -1) {
      console.log("Removing user ID from loggedInUserIds:", userId);
      loggedInUserIds.splice(index, 1);
    }
  }
});
});

async function sendAlert(userId: string) {
  // Implement logic to send alert to the user with userId
  // You can use socket.id to emit events to the specific user's socket
  if (connectedUsers[userId]) {
    io.to(connectedUsers[userId].socketId).emit(
      "alert",
      "You are logged in from another device."
    );
  }
}













// ===================================================================================


server.listen(config.PORT, () => {
  console.log(`[⚡] Server Is Running on ${config.BACKENDURL}`);
});

export default app;
