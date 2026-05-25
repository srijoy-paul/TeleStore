import { Router } from "express";
import multer from "multer";
import { uploadFileController, listFilesController } from "./files.controller";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadFileController)
router.get("/", listFilesController)

export default router;