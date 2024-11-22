import winston from "winston";
import "winston-mongodb";

export const mongoTransport = new winston.transports.MongoDB({
  db: process.env.MONGO_URI,
  collection: "log",
});

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    // new winston.transports.File({ filename: "error.log", level: "error" }),
    // new winston.transports.File({ filename: "all.log" }),
    mongoTransport
  ],
});

export function log(options) {
  logger.log({ level: "info", ...options });
}
