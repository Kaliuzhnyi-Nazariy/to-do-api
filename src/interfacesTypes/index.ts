import { Request } from "express";
import { IUser, IUserReceived } from "../models/types/user.schema";

export interface extendedUser extends Request {
  user: IUserReceived;
}
