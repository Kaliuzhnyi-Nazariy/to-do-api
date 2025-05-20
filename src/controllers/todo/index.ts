import { Request, Response } from "express";
import { extendedUser } from "../../interfacesTypes";
import ToDoSchema from "../../models/todo.model";
import errorHandler from "../../helpers/errorHandler";
import { IToDo } from "../../models/types/todo.schema";
import ctrlWrapper from "../../helpers/ctrlWrapper";
import { IToDoReturn } from "./interfaces";

const getToDo = async (req: Request, res: Response<IToDo[]>) => {
  const { _id } = (req as extendedUser).user;

  const toDos = await ToDoSchema.find({ owner: _id });

  return res.status(200).json(toDos);
};

const addToDo = async (req: Request, res: Response<IToDoReturn>) => {
  const { _id } = (req as extendedUser).user;

  const { title, description, endTime } = req.body;

  const newToDo = await ToDoSchema.create({
    title,
    description: description || "",
    endTime,
    owner: _id,
  });

  if (!newToDo) throw errorHandler(500);

  return res.status(201).json(newToDo);
};

const updateToDo = async (req: Request, res: Response) => {
  const { _id } = (req as extendedUser).user;
  const { todoId } = req.params;
  const toDoToUpdate = await ToDoSchema.findOne({ _id: todoId, owner: _id });

  if (!toDoToUpdate) return errorHandler(404, "To-do not found");

  const newToDo = await ToDoSchema.findByIdAndUpdate(
    toDoToUpdate._id,
    req.body,
    { new: true }
  );

  if (!newToDo) return errorHandler(500);

  return res.status(200).json(newToDo);
};

const updateStatus = async (req: Request, res: Response<IToDoReturn>) => {
  const { _id } = (req as extendedUser).user;
  const { todoId } = req.params;

  const { status } = req.body;

  const toDoToUpdate = await ToDoSchema.findOne({ _id: todoId, owner: _id });

  if (!toDoToUpdate) return errorHandler(404, "To-do not found");

  const newToDo = await ToDoSchema.findByIdAndUpdate(
    toDoToUpdate._id,
    { status },
    { new: true }
  );

  if (!newToDo) return errorHandler(500);

  return res.status(200).json(newToDo);
};

const deleteToDo = async (req: Request, res: Response) => {
  const { _id } = (req as extendedUser).user;
  const { todoId } = req.params;

  const toDoToDelete = await ToDoSchema.findOneAndDelete({
    _id: todoId,
    owner: _id,
  });

  if (!toDoToDelete) return errorHandler(404, "To-do not found!");

  return res.status(200).json(toDoToDelete);
};

export default {
  getToDo: ctrlWrapper(getToDo),
  addToDo: ctrlWrapper(addToDo),
  updateToDo: ctrlWrapper(updateToDo),
  updateStatus: ctrlWrapper(updateStatus),
  deleteToDo: ctrlWrapper(deleteToDo),
};
