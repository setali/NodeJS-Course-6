import express from "express";
import ArticleController from "../controllers/article";

const router = express.Router();

router.get("/", ArticleController.list);
router.get("/:id", ArticleController.get);

export default router;
