import express from "express";
import FileController from "../../../controllers/api/admin/file";
import uploader from "../../../middlewares/uploader";

const router = express.Router();

router.post("/upload", uploader.single("image"), FileController.upload);

export default router;
