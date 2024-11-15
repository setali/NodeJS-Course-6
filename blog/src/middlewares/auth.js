import jwt from "jsonwebtoken";
import { NotAuthorizeError } from "../utils/errors";

export default (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
          throw new NotAuthorizeError(error);
        }

        req.user = payload;
        next();
      });
    }
  } else {
    req.user = req.session?.user;
    next();
  }
};
