import { model, Schema, Types } from "mongoose";
import { IToDo } from "./types/todo.schema";
import helpers from "../helpers";

const statuses = ["todo", "progress", "done"];

const date = new Date(Date.now() + 24 * 60 * 60 * 1000);

const toDoSchema = new Schema<IToDo>(
  {
    title: { type: String, required: true },
    description: { type: String, maxlength: 256 },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
    endTime: {
      type: String,
      // required: true,
      default: date,
    },
    status: {
      type: String,
      enum: statuses,
      default: statuses[0],
      // required: true,
    },
  },
  { timestamps: true }
);

(toDoSchema as any).post("save", helpers.mongooseErrorHandler);

const ToDoSchema = model<IToDo>("todo", toDoSchema);

export default ToDoSchema;
