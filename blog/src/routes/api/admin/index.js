import express from "express";
import article from "./article";
import auth from "./auth";
import file from './file'

const router = express.Router();

router.use("/article", article);
router.use("/file", file)
router.use("/", auth);

export default router;
