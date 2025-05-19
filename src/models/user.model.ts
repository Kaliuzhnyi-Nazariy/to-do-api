import { Schema, model } from "mongoose";
import { IUser } from "./types/user.schema";
import helpers from "../helpers";

const userSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
    allTasks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

(userSchema as any).post("save", helpers.mongooseErrorHandler);

const User = model<IUser>("user", userSchema);

export default User;
