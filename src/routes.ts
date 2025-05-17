import { Router } from "express";
import authRouter from "./router/auth";
import { errorRouter } from "./router/error";

const router = Router();

router.use("/api/auth", authRouter);
// router.use("/api/user");
// router.use("/api/todo");

router.use(errorRouter);

export default router;
