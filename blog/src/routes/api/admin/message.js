import express from "express";
import MessageController from "../../../controllers/api/admin/message";
import acl from "../../../middlewares/acl";

const router = express.Router();

router.get("/", acl("USER"), MessageController.list);

export default router;
