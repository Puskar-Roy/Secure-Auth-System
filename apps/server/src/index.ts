import express, { Express, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import morgan from 'morgan'
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import hpp from "hpp";
import config from "./config/config";
import errorHandler from "./middleware/errorHandler";
import CheckError from "./util/checkError";
import { limiter, corsOptions, socketOptions } from "./util/utils";
import authRoutes from "./routes/authRoutes";
import userRoutes from './routes/userRoutes';
import { sendAleart } from "./util/sendAleart";

const app: Express = express();

app.use(express.json());
app.use(morgan("combined"));
app.use(limiter);
app.use(config.DEV_ENV === "PROD" ? cors(corsOptions) : cors());
// app.set("trust proxy", config.DEV_ENV === "PROD" ? true : false);
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
app.use("/api/v0.1/users", userRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new CheckError(`Can't find ${req.originalUrl} on this server!`, 404));
});


let activeUsers = 0;
const loggedInUserIds: string[] = [];

io.on("connection", (socket) => {
  activeUsers++;
  io.emit("activeUsers", activeUsers);

  socket.on("login", async (userId: string) => {
    if (loggedInUserIds.includes(userId)) {
      io.emit("rerender");
      await sendAleart(userId);
    } else {
      loggedInUserIds.push(userId);
    }
  });

   socket.on("logout", () => {
     io.emit("rerender"); 
   });

  socket.on("disconnect", () => {
    activeUsers--;
    io.emit("activeUsers", activeUsers);

    const index = loggedInUserIds.indexOf(socket.id);
    if (index !== -1) {
      loggedInUserIds.splice(index, 1);
    }
  });
});





// let activeUsers = 0;
// const loggedInUsers: Record<string, string> = {};

// io.on("connection", (socket) => {
//   activeUsers++;
//   io.emit("activeUsers", activeUsers);

//   socket.on("login", async (userId: string) => {
//     const existingSocketId = loggedInUsers[userId];
//     if (existingSocketId) {
//       io.to(existingSocketId).emit("rerender");
//       await sendAleart(userId);
//     } else {
//       loggedInUsers[userId] = socket.id;
//     }
//   });

//   socket.on("logout", () => {
//     const userId = getUserIdBySocketId(socket.id);
//     delete loggedInUsers[userId as string];
//     io.emit("rerender");
//   });

//   socket.on("disconnect", () => {
//     activeUsers--;
//     io.emit("activeUsers", activeUsers);

//     const userId = getUserIdBySocketId(socket.id);
//     delete loggedInUsers[userId as string];
//   });

//   function getUserIdBySocketId(socketId: string): string | undefined {
//     for (const userId in loggedInUsers) {
//       if (loggedInUsers[userId] === socketId) {
//         return userId;
//       }
//     }
//     return undefined;
//   }
// });










server.listen(config.PORT, () => {
  console.log(`[⚡] Server Is Running on ${config.BACKENDURL}`);
});

export default app;
