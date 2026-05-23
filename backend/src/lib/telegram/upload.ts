import { client } from "./client";
import fs from "fs";

export const uploadFileToTeleStore = async (filePath: string) => {
    const result = await client.sendFile("me", {  //me => root folder
        file: filePath,
        caption: "Uploaded via TeleStore",
    });

    return {
        messageId: result.id,
        fileName: filePath.split("/").pop(),
    };
};