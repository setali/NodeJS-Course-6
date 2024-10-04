import express from "express";
import ArticleController from "../../controllers/admin/article";

const router = express.Router();

router.get("/", ArticleController.list);
router.get("/:id([0-9]+)", ArticleController.get);
// router.get("/:id(\\d+)", ArticleController.get);
router.get("/create", ArticleController.create);
router.post("/", ArticleController.add);
router.get("/:id(\\d+)/edit", ArticleController.edit);
router.put("/:id(\\d+)", ArticleController.update);


export default router;

// Restful API - CRUD
// /article           GET     List articles
// /article/:id       GET     Get an article
// /article           POST    Create an article
// /article/:id       PUT     Update an article
// /article/:id       PATCH   Patch an article
// /article/:id       DELETE  Remove an article
