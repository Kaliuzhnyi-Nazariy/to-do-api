import { Types } from "mongoose";

export interface IToDo {
  title: string;
  description?: string;
  endTime: string | Date;
  owner: Types.ObjectId;
  [x: string]: any;
}
