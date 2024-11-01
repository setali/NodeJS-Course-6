import express from "express";
import article from "./article";
import auth from "./auth";

const router = express.Router();

router.use("/article", article);
router.use("/", auth);

export default router;
