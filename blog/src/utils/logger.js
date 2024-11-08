import winston from "winston";
import "winston-mongodb";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    // new winston.transports.File({ filename: "error.log", level: "error" }),
    // new winston.transports.File({ filename: "all.log" }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27006/blog",
      collection: "log",
    }),
  ],
});

export function log(options) {
  logger.log({ level: "info", ...options });
}
