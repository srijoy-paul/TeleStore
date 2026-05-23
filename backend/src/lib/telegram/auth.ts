import { client } from "./client";

export const initTelegram = async () => {
    // 1. Connect to Telegram servers
    await client.connect();

    // 2. Check if we are already authorized (logged in)
    const isAuthorized = await client.isUserAuthorized();

    if (!isAuthorized) {
        console.error("\n❌ Telegram client is NOT authorized!");
        console.error("👉 Please run the interactive login script in your terminal to authenticate first:");
        console.error("   npm run telegram:login");
        console.error("   (After successful login, start the server again with 'npm run dev')\n");
        process.exit(1);
    }

    console.log("✅ Telegram Connected (Session loaded successfully)!");
};