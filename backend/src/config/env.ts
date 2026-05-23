import dotenv from "dotenv";

dotenv.config();

export const env = {
    port: process.env.PORT || 5000,
    apiId: Number(process.env.API_ID),
    apiHash: process.env.API_HASH!,
    phone: process.env.PHONE!
}