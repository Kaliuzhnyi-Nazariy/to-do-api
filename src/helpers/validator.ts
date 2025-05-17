import { Response, Request, NextFunction } from "express";
import { Schema } from "zod";
import errorHandler from "./errorHandler";

const validator = (validationSchema: Schema) => {
  const fn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validationSchema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof Error) {
        throw errorHandler(400, error?.message);
      } else {
        next(error);
      }
    }
  };
  return fn;
};

export default validator;
