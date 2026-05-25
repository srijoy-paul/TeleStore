import prisma from "../../lib/db/prisma";
import { uploadFileToTeleStore } from "../../lib/telegram/upload";
import { findFiles } from "./files.repository";
import { ListFilesQuery } from "./files.types";
import fs from "fs";

export const uploadFileService = async (filePath: string) => {
    const telegramResponse = await uploadFileToTeleStore("me", filePath);
    console.log(`Telegram returned: `, `\n Message id: ${telegramResponse.messageId} `, `\n File name: ${telegramResponse.fileName}`)

    const stats = fs.statSync(filePath);

    // Save metadata in database
    const savedFile = await prisma.file.create({
        data: {
            name: telegramResponse.fileName || "unnamed",
            telegramMessageId: telegramResponse.messageId,
            size: stats.size,
        }
    });

    console.log(`Saved file in database with ID: ${savedFile.id}`);

    return savedFile;
}

export const listFilesService = async (query: ListFilesQuery) => {
    return await findFiles(query)
}