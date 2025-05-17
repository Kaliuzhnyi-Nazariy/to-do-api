// import { NextFunction, Request, Response } from "express";
import { NextFunction, Request, Response } from "express-serve-static-core";
import { functionController } from "./types";
import { RequestHandler } from "express";

const ctrlWrapper = (ctrl: functionController): RequestHandler => {
  const fn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return fn;
};

export default ctrlWrapper;
