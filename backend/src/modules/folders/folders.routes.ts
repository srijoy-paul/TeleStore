import { Router } from "express";
import { createFolderController, listFoldersController, getFolderByIdController, deleteFolderController } from "./folders.controller"

const router = Router();

router.post("/", createFolderController);

router.get("/", listFoldersController)

router.get("/:id", getFolderByIdController)

router.delete("/:id", deleteFolderController)

export default router;