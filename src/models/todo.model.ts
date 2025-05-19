import { model, Schema, Types } from "mongoose";
import { IToDo } from "./types/todo.schema";
import helpers from "../helpers";

const toDoSchema = new Schema<IToDo>(
  {
    title: { type: String, required: true },
    description: { type: String, maxlength: 256 },
    owner: { type: Schema.Types.ObjectId, ref: "user", required: true },
    endTime: {
      type: String,
      required: true,
      default: new Date().toLocaleDateString(),
    },
  },
  { timestamps: true }
);

(toDoSchema as any).post("save", helpers.mongooseErrorHandler);

const ToDoSchema = model<IToDo>("todo", toDoSchema);

export default ToDoSchema;
