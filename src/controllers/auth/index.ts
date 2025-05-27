import { Request, Response } from "express";
import ctrlWrapper from "../../helpers/ctrlWrapper";
import { IUser } from "../../models/types/user.schema";
import {
  ISignupUserData,
  IUserReturn,
  UserSignIn,
  UserSignUp,
} from "./interfaces";
import errorHandler from "../../helpers/errorHandler";
import bcryptjs from "bcryptjs";
import User from "../../models/user.model";
import * as jwt from "jsonwebtoken";
import { extendedUser } from "../../interfacesTypes";

const { SECRET_JWT } = process.env;

const signUp = async (
  req: Request<{}, {}, UserSignUp>,
  res: Response<IUserReturn>
) => {
  try {
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

    await User.findByIdAndUpdate(newUser._id, { token });

    return res
      .cookie("token", token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        httpOnly: true,
        // sameSite: "lax",
        secure: true,
        path: "/",
      })
      .status(201)
      .json({
        email,
        name,
        allTasks: newUser.allTasks,
        _id: newUser._id,
        token,
      });
  } catch (error) {
    console.error(error);
  }
};

const signIn = async (
  req: Request<{}, {}, UserSignIn>,
  res: Response<IUserReturn>
) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return errorHandler(400, "Email or password is incorrect");

  const comparePasswords = await bcryptjs.compare(password, user.password);

  if (!comparePasswords)
    return errorHandler(400, "Email or password is incorrect");

  const payload = {
    _id: user._id,
  };

  const token = jwt.sign(payload, SECRET_JWT as string, { expiresIn: "72h" });

  await User.findByIdAndUpdate(user._id, { token });

  return res
    .cookie("token", token, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      httpOnly: true,
      // sameSite: "lax",
      secure: true,
      path: "/",
    })
    .status(200)
    .json({
      email,
      name: user.name,
      _id: user._id,
      allTasks: user.allTasks,
      token,
    });
};

const logout = async (req: Request<{}, {}, IUser>, res: Response<IUser>) => {
  const { _id } = (req as extendedUser).user;

  const userToLogOut = await User.findByIdAndUpdate(_id, { token: "" });

  if (!userToLogOut) return errorHandler(500);

  res
    .clearCookie("token", {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      httpOnly: true,
      // sameSite: "lax",
      secure: true,
      path: "/",
    })
    .status(204)
    .json();
};

export default {
  signUp: ctrlWrapper(signUp),
  signIn: ctrlWrapper(signIn),
  logout: ctrlWrapper(logout),
};
