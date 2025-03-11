import jwt from "../utils/jwt.key";
import { prisma } from "../db/prisma.db";
import { IPayload } from "../types/types";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const authCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
):Promise<void> => {
    const authHeader = req.headers.authorization;
  try {
    if(authHeader === undefined) res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Credentials not provided' })
    const token:string | any= authHeader?.split(' ')[1]
    const decode:IPayload | any = jwt.verify(token)
    const idAuth = await prisma.userColab.findUnique({where: {id: decode.id}})
    if(!idAuth) res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Wrong provided credentials' })
    
    next()  

  } catch(error) {
   res.status(StatusCodes.UNAUTHORIZED).json({message:`${error} ---> Wrong credentials`})
  }
};
