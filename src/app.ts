import express, { Request, Response } from "express";
import router from "./routes";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(router);

export default app;
