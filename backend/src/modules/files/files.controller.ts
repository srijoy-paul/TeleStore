import { Request, Response } from "express";
import { uploadFileService } from "./files.service";

export const uploadFileController = async (req: Request, res: Response) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const result = await uploadFileService(file.path);

        res.json(result);
    } catch (error) {
        console.log("❌ Upload Error:", error);
        res.status(500).json({ error: "Failed to upload file" })
    }
}