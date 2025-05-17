import { Request, Response } from "express";
import ctrlWrapper from "../../helpers/ctrlWrapper";
import { IUser } from "../../models/types/user.schema";
import { ISignupUserData, IUserReturn, UserSignUp } from "./interfaces";
import errorHandler from "../../helpers/errorHandler";
import bcryptjs from "bcryptjs";
import User from "../../models/user.model";
import * as jwt from "jsonwebtoken";

const { SECRET_JWT } = process.env;

const signUp = async (
  req: Request<{}, {}, UserSignUp>,
  res: Response<IUserReturn>
) => {
  const { email, name, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    errorHandler(400, "Passwords do not matches!");
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = await User.create<ISignupUserData>({
    email,
    name,
    password: hashedPassword,
  });

  if (!newUser) return errorHandler(400);

  const payload = {
    _id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_JWT as string, { expiresIn: "72h" });

  res
    .cookie("token", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      // sameSite: "none",
      sameSite: "lax",
      secure: true,
      path: "/",
    })
    .status(201)
    .json({ email, name, allTasks: newUser.allTasks, _id: newUser._id, token });
};

const signIn = async (req: Request<{}, {}, IUser>, res: Response<IUser>) => {
  const body = req.body;

  res.status(200).json(body);
};

const logout = async (req: Request<{}, {}, IUser>, res: Response<IUser>) => {
  const body = req.body;

  res.status(204).json();
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  logout: ctrlWrapper(logout),
};
