import express from "express";
import article from "./article";
import auth from "./auth";
import file from "./file";
import person from "./person";
import message from "./message";

const router = express.Router();

router.use("/article", article);
router.use("/message", message);
router.use("/person", person);
router.use("/file", file);
router.use("/", auth);

export default router;
