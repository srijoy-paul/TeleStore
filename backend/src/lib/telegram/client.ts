import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { env } from "../../config/env";
import fs from 'fs';
import path from 'path';

const SESSION_FILE_PATH = path.join(process.cwd(), '.session');

let sessionString = "";
if (fs.existsSync(SESSION_FILE_PATH)) {
    try {
        sessionString = fs.readFileSync(SESSION_FILE_PATH, 'utf8').trim();
    } catch (err) {
        console.error("⚠️ Failed to read .session file:", err);
    }
} else if (process.env.TELEGRAM_SESSION) {
    sessionString = process.env.TELEGRAM_SESSION.trim();
}

const stringSession = new StringSession(sessionString);

export const client = new TelegramClient(
    stringSession,
    env.apiId,
    env.apiHash,
    { connectionRetries: 5 }
);

export { SESSION_FILE_PATH };