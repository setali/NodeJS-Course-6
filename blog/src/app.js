import express from "express";
import routes from "./routes";
import errorHandler from "./middlewares/error-handler";
import path from "path";
import methodOverride from "./middlewares/method-override";
import { sequelize } from "./config/database";
import auth from "./middlewares/auth";
import session from "./utils/session";
import cors from 'cors'

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
  await sequelize.sync();

  app.use(express.static("public"));
  app.use(methodOverride);
  app.use(routes);
  app.use(errorHandler);

  const port = process.env.PORT;
  app.listen(port, () => console.log(`Server is running on port ${port}`));
}
