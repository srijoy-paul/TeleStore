import app from "./app"
import { env } from "./config/env"
import { initTelegram } from "./lib/telegram/auth"


const start = async () => {
    await initTelegram();

    app.listen(env.port, async () => {
        console.log(`🚀 Server running on port ${env.port}`);
    })
}

start();