import { createTelegramFolderChannel } from "../../lib/telegram/channels"
import { createFolderRecord, findFolders, findFolderById, deleteFolderRecord } from "./folders.repository"

export const createFolderService = async (name: string) => {
    // 1. create tg channel
    const tgChannel = await createTelegramFolderChannel(name);

    // 2. save in db
    const folder = await createFolderRecord({
        name,
        telegramId: BigInt(tgChannel.telegramId),
        accessHash: tgChannel.accessHash
    })

    return folder;
}

export const listFoldersService = async () => {
    return findFolders();
}

export const getFolderByIdService = async (id: string) => {
    return findFolderById(id);
}

export const deleteFolderService = async (id: string) => {
    return deleteFolderRecord(id);
}