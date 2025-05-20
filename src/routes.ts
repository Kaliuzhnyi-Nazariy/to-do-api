import { Router } from "express";
import authRouter from "./router/auth";
import { errorRouter } from "./router/error";
import userRouter from "./router/user";
import todoRouter from "./router/todo";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/user", userRouter);
router.use("/api/todo", todoRouter);

router.use(errorRouter);

export default router;
