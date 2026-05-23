import { client, SESSION_FILE_PATH } from "./client";
import input from "input";
import { env } from "../../config/env";
import fs from "fs";

const login = async () => {
    console.log("🔄 Connecting to Telegram...");
    await client.connect();

    const isAuthorized = await client.isUserAuthorized();

    if (isAuthorized) {
        console.log("✅ Already authenticated! Session is active and valid.");
        process.exit(0);
    }

    console.log("🔑 Telegram authorization needed. Starting interactive login...");

    try {
        await client.start({
            phoneNumber: async () => env.phone,
            password: async () => await input.text("2FA Password (if any): "),
            phoneCode: async () => await input.text("Enter OTP: "),
            onError: (err) => {
                console.error("❌ Telegram error during authentication:", err);
                return Promise.resolve(true); // Return Promise<boolean> to abort the GramJS automatic retry loop
            }
        });

        console.log("✅ Telegram Connected Successfully!");

        const sessionString = client.session.save() as unknown as string;
        fs.writeFileSync(SESSION_FILE_PATH, sessionString, "utf8");
        console.log(`💾 Session successfully saved to:\n   ${SESSION_FILE_PATH}\n`);
        process.exit(0);
    } catch (error) {
        console.error("❌ Login failed:", error);
        process.exit(1);
    }
};

login();
