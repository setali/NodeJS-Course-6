import expressSession from "express-session";
import RedisStore from "connect-redis";
import { redisClient } from "../config/redis";

export default () => {
  const store = new RedisStore({ client: redisClient });

  return expressSession({
    proxy: process.env.NODE_ENV === "production",
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge:
        process.env.NODE_ENV === "production"
          ? 1000 * 60 * 60 * 24 * 7
          : 1000 * 60 * 50,
    },
  });
};
