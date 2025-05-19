import { Router } from "express";
import ctrl from "../controllers/user";
import isAuthenticated from "../middlewares/isAuthenticated";
import validator from "../helpers/validator";
import updateValidation from "../models/validations/user/";

const router = Router();

router.get("/me", isAuthenticated, ctrl.getInfo);
router.put(
  "/update",
  isAuthenticated,
  validator(updateValidation),
  ctrl.updateUser
);
router.delete("/delete", isAuthenticated, ctrl.deleteAccount);

export default router;
