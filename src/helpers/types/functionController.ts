// import { NextFunction, Request, Response } from "express";
import { NextFunction, Request, Response } from "express-serve-static-core";

// export type functionController = (
//   req: Request<any, any, any>,
//   res: Response<any>,
//   next: NextFunction
// ) => Promise<void>;
export type functionController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;
