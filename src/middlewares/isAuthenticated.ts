import { NextFunction, Request, Response } from "express";
import errorHandler from "../helpers/errorHandler";
import User from "../models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { extendedUser } from "../interfacesTypes";

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;
  if (!token) {
    return errorHandler(401);
  }

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT!) as JwtPayload;

    if (typeof payload === "object" && "_id" in payload) {
      const user = await User.findById(payload._id);

      if (!user) return errorHandler(401, "Invalid token payload");

      (req as extendedUser).user = user;

      next();
    } else {
      return errorHandler(401, "Invalid token payload");
    }
  } catch (err) {
    return errorHandler(401, "Invalid or expired token");
  }
};

export default isAuthenticated;
