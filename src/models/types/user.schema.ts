import { Types } from "mongoose";

export type IUser = {
  email: string;
  name: string;
  password: string;
  token?: string;
  allTasks?: number;
};

export type IUserReceived = {
  _id: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  token?: string;
  allTasks?: number;
};
