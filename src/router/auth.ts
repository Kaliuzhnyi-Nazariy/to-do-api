import express from "express";
import ctrl from "../controllers/auth";
import validator from "../helpers/validator";
import signupValidation from "../models/validations/user/signup.validation";

const router = express.Router();

router.post("/signup", validator(signupValidation), ctrl.signUp);
router.post("/signin", ctrl.signIn);
router.post("/logout", ctrl.logout);

export default router;
