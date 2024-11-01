import express from "express";
import AuthController from "../../../controllers/api/admin/auth";

const router = express.Router();

router.get("/user", AuthController.user);
router.post("/login", AuthController.login);
router.post("/token", AuthController.getToken);

export default router;
