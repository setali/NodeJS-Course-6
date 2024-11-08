import express from "express";
import ArticleController from "../../controllers/admin/article";
import acl from "../../middlewares/acl";

const router = express.Router();

router.get("/", acl("WRITER"), ArticleController.list);
router.get("/:id([0-9]+)", acl("WRITER"), ArticleController.get);
// router.get("/:id(\\d+)", ArticleController.get);
router.get("/create", acl("WRITER"), ArticleController.create);
router.post("/", acl("WRITER"), ArticleController.add);
router.get("/:id(\\d+)/edit", acl("MODERATOR"), ArticleController.edit);
router.put("/:id(\\d+)", acl("MODERATOR"), ArticleController.update);
router.delete("/:id(\\d+)", acl("ADMIN"), ArticleController.remove);

export default router;

// Restful API - CRUD
// /article           GET     List articles
// /article/:id       GET     Get an article
// /article           POST    Create an article
// /article/:id       PUT     Update an article
// /article/:id       PATCH   Patch an article
// /article/:id       DELETE  Remove an article
