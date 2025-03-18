import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../db/prisma.db";
import { IPayload } from "../types/types";
import jwt from "../utils/jwt.key";


/**
 * Middleware to manage authentication and authorization for "SUPER-ADMIN" action.
 * This function:
 *  - Validates the presence of an authorization token.
 *  - Decodes and verifies the JWT token.
 *  - Check if the associated user exists in the DB.
 *  - Ensures the user has SUPER-ADMIN privs before proceeding.
 * 
 * @param {Request} req --> Incoming REQUEST
 * @param {Response} res --> RESPONSE object to the client
 * @param {NextFunction} next --> The NEXT middleware function.
 * @returns {Promise<void>} - Return voide or terminates with HTTP RESPONSE
 */

export const actManagement = async (
  req: Request,
  res: Response,
  next: NextFunction
):Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader){
    res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Credentials not provided" })
    return
  }
     


  try {
    // Split the BEARER TOKEN    
    const token: string | any = authHeader?.split(" ")[1];

    // Decoding using Jason web Token 
    const decode: IPayload | any = jwt.verify(token); 

    // Using the decoding object value to make a query
    const idAuth = await prisma.userColab.findUnique({
      where: { id: decode.id },
    });

    // First: Check if existe the current user
    if (!idAuth){
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Wrong provided credentials" });
        return
    }
     

     // Check if is Super-Admin   
     if(!idAuth?.isSuperAdmin){
      res
         .status(StatusCodes.FORBIDDEN).json({ message: "Forbidden actions: LOW LEVEL CREDENTIALS" })

       return  
     }
      
          
     next()     
  } catch (error) {
   /* res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Wrong request!" });*/

   return next(error)   
  }
};
