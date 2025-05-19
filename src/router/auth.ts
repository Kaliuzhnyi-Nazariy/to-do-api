import express from "express";
import ctrl from "../controllers/auth";
import validator from "../helpers/validator";
import validation from "../models/validations/auth";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = express.Router();

router.post("/signup", validator(validation.signupValidation), ctrl.signUp);
router.post("/signin", validator(validation.signInValidation), ctrl.signIn);
router.post("/logout", isAuthenticated, ctrl.logout);

export default router;
