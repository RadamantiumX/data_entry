import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../db/prisma.db";
import { IPayload } from "../types/types";
import jwt from "../utils/jwt.key";

export const actManagement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader === undefined)
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Credentials not provided" });
    const token: string | any = authHeader?.split(" ")[1];
    const decode: IPayload | any = jwt.verify(token);
    const idAuth = await prisma.userColab.findUnique({
      where: { id: decode.id },
    });
    if (!idAuth)
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Wrong provided credentials" });

     if(!idAuth?.isSuperAdmin)
       res
          .status(StatusCodes.FORBIDDEN).json({ message: "Forbidden actions: LOW LEVEL CREDENTIALS" })     
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Wrong request!" });
  }
};
