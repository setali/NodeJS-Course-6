import express from "express";
import "express-async-errors";
import routes from "./routes";
import errorHandler from "./middlewares/error-handler";
import path from "path";
import methodOverride from "./middlewares/method-override";
import { sequelize } from "./config/database";
import auth from "./middlewares/auth";
import session from "./utils/session";
import cors from "cors";
import http from "http";
import socketIO from "socket.io";
import chat from "./chat";

global.__basedir = path.resolve(__dirname, "..");

export async function bootstrap() {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ extended: true }));
  app.set("views", path.resolve(__dirname, "views"));
  app.set("view engine", "ejs");

  app.use(cors());
  app.use(session());
  app.use(auth);

  await sequelize.authenticate();
  await sequelize.sync({ alter: true });

  app.use(express.static("public"));
  app.use(methodOverride);
  app.use(routes);
  app.use(errorHandler);

  const server = http.createServer(app);

  const io = new socketIO.Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    try {
      auth(socket.request, {}, next);
    } catch (error) {
      next(error);
    }
  });

  io.on("connection", (socket) => chat(socket, io));

  return server;
}
