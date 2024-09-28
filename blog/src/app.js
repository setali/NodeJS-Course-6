import express from "express";
import routes from "./routes";
import errorHandler from "./middlewares/error-handler";

const app = express();

app.use(express.static("public"));
app.use(routes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
