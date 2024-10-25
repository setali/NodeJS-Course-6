import express from "express";
import ArticleController from "../../../controllers/api/admin/article";

const router = express.Router();

router.get("/", ArticleController.list);
router.get("/:id([0-9]+)", ArticleController.get);
router.post("/", ArticleController.add);
router.put("/:id(\\d+)", ArticleController.update);
router.delete("/:id(\\d+)", ArticleController.remove);

export default router;

// Restful API - CRUD
// /article           GET     List articles
// /article/:id       GET     Get an article
// /article           POST    Create an article
// /article/:id       PUT     Update an article
// /article/:id       PATCH   Patch an article
// /article/:id       DELETE  Remove an article
