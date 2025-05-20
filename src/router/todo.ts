import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import validator from "../helpers/validator";
import validation from "../models/validations/todo";
import ctr from "../controllers/todo";

const router = Router();

router.get("/", isAuthenticated, ctr.getToDo);

router.post(
  "/",
  isAuthenticated,
  validator(validation.todoValidation),
  ctr.addToDo
);

router.put(
  "/:todoId",
  isAuthenticated,
  validator(validation.todoValidation),
  ctr.updateToDo
);

router.patch(
  "/status/:todoId",
  isAuthenticated,
  validator(validation.todoStatusValidation),
  ctr.updateStatus
);

router.delete("/:todoId", isAuthenticated, ctr.deleteToDo);

export default router;
