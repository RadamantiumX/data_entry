import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IPayload } from "../types/types";
import jwt from "../key/jwt.key";
import { checkingRecord } from "../prisma_querys/usercolab.querys";
import { JWTverifyAndDecode } from "../helper/jwt.helper";
import { UserColab } from "@prisma/client";

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
    // Decoding JWT
    const {id}:Pick<IPayload, "id"> = JWTverifyAndDecode(authHeader)

    // Using the decoding object value to make a query
    const idAuth = await checkingRecord(id)

    // First: Check if existe the current user
    if (!idAuth){
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "User not found or credentials invalid" });
        return
    }
     

     // Super Admin Check 
     if(!idAuth?.isSuperAdmin){
      res
         .status(StatusCodes.FORBIDDEN).json({ message: "Forbidden actions: LOW LEVEL CREDENTIALS" })

       return  
     }
      
          
     next() // Next Middleware    
  } catch (error) {
   return next(error)   
  }
};
