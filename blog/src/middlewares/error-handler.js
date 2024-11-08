import { JsonSchemaValidation } from "express-jsonschema";
import { log } from "../utils/logger";

export default (error, req, res, next) => {
  console.log(error.message);
  const status = error.status || 500;

  log({
    level: "error",
    message: error.message,
    metadata: { user: req.user, url: req.url, status },
  });

  if (error instanceof JsonSchemaValidation) {
    return res.status(400).json({
      code: 400,
      message: "Validation Error",
      fields: error.validations,
    });
  }

  const message =
    process.env.NODE_ENV === "development" || status < 500
      ? error.message
      : "Server error, Please call to administrator";

  if (req.url.startsWith("/api")) {
    res.status(status).json({
      code: status,
      message,
    });
  } else {
    res.status(status).render("error", {
      title: `Error: ${status}`,
      content: message,
      user: req.user,
    });
  }
};
