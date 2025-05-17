import dotenv from "dotenv";
import { connectDB } from "./db.config";
dotenv.config();
import app from "./app";

const { PORT } = process.env;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("dev");
  });
});
