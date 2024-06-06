import { IUser } from "@/types";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { TOKEN_SECRET = "" } = process.env;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(" ")[1];
      jwt.verify(token, TOKEN_SECRET);
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized user!" });
    }
  } catch (error) {
    return res.status(401).json(`Invalid token ${error}`);
  }
};

export const getTokenByUser = (user: IUser) => {
  return jwt.sign({ user }, TOKEN_SECRET);
};
