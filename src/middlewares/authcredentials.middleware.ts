import jwt from "../key/jwt.key";
import { prisma } from "../db/prisma.db";
import { IPayload } from "../types/types";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTverifyAndDecode } from "../helper/jwt.helper";

/**
 * Middleware to manage the authentication
 * In this function:
 *  - Validates the presence of an authorization token.
 *  - Decodes and verifies the JWT token.
 *  - Check if the associated user exists in the DB.
 *  
 * @param {Request} req --> Incoming REQUEST
 * @param {Response} res --> RESPONSE object to the client
 * @param {NextFunction} next --> The NEXT middleware function.
 * @returns {Promise<void>} - Return voide or terminates with HTTP RESPONSE
 */
export const authCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
):Promise<void> => {
    const authHeader = req.headers.authorization;
    
    // Verifing if is the token missing
     if(authHeader === undefined) 
      {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Credentials not provided' })
        return
    }
  try {
   
    const {id} = JWTverifyAndDecode(authHeader)
    const idAuth = await prisma.userColab.findUnique({where: {id: id }})

    // If not an Authenticated user
    if(!idAuth){
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Wrong provided credentials' })
      return
    }
    // Next middleware
    next()  

  } catch(error) {
   
   return next(error)
  }
};
