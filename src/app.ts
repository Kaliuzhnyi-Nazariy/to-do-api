import express, { Request, Response } from "express";
import router from "./routes";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://to-do-pi-ochre.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(router);

export default app;
