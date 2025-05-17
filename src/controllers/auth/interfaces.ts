import { Document, Types } from "mongoose";
import { IUser } from "../../models/types/user.schema";

export interface UserSignUp extends IUser {
  confirmPassword: string;
}

export interface ISignupUserData extends IUser, Document {
  _id: Types.ObjectId;
  [x: string]: any;
}

export type IUserReturn = Omit<ISignupUserData, "password">;
