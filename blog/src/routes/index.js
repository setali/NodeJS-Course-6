import express from "express";
import general from "./general";
import auth from "./auth";
import admin from "./admin";
import { NotFoundError } from "../utils/errors";

const router = express.Router();

router.use(general);
router.use(auth);
router.use("/admin", admin);

router.all("*", (req, res) => {
  throw new NotFoundError();
});

export default router;
