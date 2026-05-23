import { client } from "./client";

export const downloadFile = async (messageId: number) => {
    const messages = await client.getMessages("me", {
        ids: [messageId],
    });

    const message = messages[0];

    if (!message || !message.media) {
        throw new Error("File not found");
    }

    const file = await client.downloadMedia(message);

    return file;
};