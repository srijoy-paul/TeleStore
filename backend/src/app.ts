import express from "express";
import cors from "cors";
import filesRoutes from "./modules/files/files.routes";

const app = express();
app.use(express.json());

app.use("/api/files", filesRoutes)

export default app;