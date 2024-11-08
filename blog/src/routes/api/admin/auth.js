import express from "express";
import AuthController from "../../../controllers/api/admin/auth";
import { validate } from "express-jsonschema";
import { loginSchema } from "../../../validators/login";

const router = express.Router();

router.get("/user", AuthController.user);
router.post("/login", validate(loginSchema), AuthController.login);
router.post("/token", AuthController.getToken);

export default router;
