import { uploadFileToTeleStore } from "../../lib/telegram/upload";

export const uploadFileService = async (filePath: string) => {
    const telegramResponse = await uploadFileToTeleStore(filePath);
    console.log(`Telegram returned: `, `\n Message id: ${telegramResponse.messageId} `, `\n File name: ${telegramResponse.fileName}`)

    //Todo: save in database

    return telegramResponse;
}