import { Types } from "mongoose";
import { IToDo } from "../../models/types/todo.schema";

export interface IToDoReturn extends IToDo {
  _id: Types.ObjectId;
}
