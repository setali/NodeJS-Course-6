import express from "express";
import ArticleController from "../../../controllers/api/admin/article";
import acl from "../../../middlewares/acl";
import { validate } from "express-jsonschema";
import { articleSchema } from "../../../validators/article";

const router = express.Router();

router.get("/", acl("WRITER"), ArticleController.list);
router.get("/:id([0-9]+)", acl("WRITER"), ArticleController.get);
router.post("/", acl("WRITER"), validate(articleSchema), ArticleController.add);
router.put(
  "/:id(\\d+)",
  acl("MODERATOR"),
  validate(articleSchema),
  ArticleController.update
);
router.delete("/:id(\\d+)", acl("ADMIN"), ArticleController.remove);

export default router;

// Restful API - CRUD
// /article           GET     List articles
// /article/:id       GET     Get an article
// /article           POST    Create an article
// /article/:id       PUT     Update an article
// /article/:id       PATCH   Patch an article
// /article/:id       DELETE  Remove an article
