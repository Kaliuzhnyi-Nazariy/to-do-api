import { Request, Response } from "express";
import ctrlWrapper from "../../helpers/ctrlWrapper";
import { extendedUser } from "../../interfacesTypes";
import User from "../../models/user.model";
import bcryptjs from "bcryptjs";

import errorHandler from "../../helpers/errorHandler";
import { IUpdateUser } from "./interface";
import ToDoSchema from "../../models/todo.model";

const getInfo = async (req: Request, res: Response) => {
  const { email, name, allTasks } = (req as extendedUser).user;

  res.status(200).json({ email, name, allTasks });
};

const updateUser = async (req: Request, res: Response) => {
  const { _id, email, name, password } = (req as extendedUser).user;

  const { email: newEmail, name: newName, password: newPassword } = req.body;

  const updates: Partial<IUpdateUser> = {};

  if (newEmail && email !== newEmail) {
    updates.email = newEmail;
  }

  if (newName && name !== newName) {
    updates.name = newName;
  }

  if (newPassword) {
    const comparePasswords = await bcryptjs.compare(newPassword, password);

    if (!comparePasswords) {
      updates.password = await bcryptjs.hash(newPassword, 10);
    }
  }

  if (Object.keys(updates).length === 0) {
    return errorHandler(
      400,
      "No changes detected. All fields match the current data."
    );
  }

  const newUser = await User.findByIdAndUpdate(_id, updates, { new: true });

  return res.status(200).json(newUser);
};

const deleteAccount = async (req: Request, res: Response) => {
  const { _id } = (req as extendedUser).user;

  await ToDoSchema.deleteMany({ owner: _id });

  await User.findByIdAndDelete(_id);

  return res
    .clearCookie("token", {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      // sameSite: "lax"
      httpOnly: true,
      secure: true,
      path: "/",
    })
    .status(204)
    .json();
};

export default {
  getInfo: ctrlWrapper(getInfo),
  updateUser: ctrlWrapper(updateUser),
  deleteAccount: ctrlWrapper(deleteAccount),
};
