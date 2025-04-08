import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "../services/auth.service";

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
    const refreshToken:string | any = req.headers['x-refresh-token']
    // Verifing if is the token missing
     if(!authHeader || !refreshToken) 
      {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Credentials not provided' })
        return
    }
  try {
    await AuthService.authCredentialsVerify(authHeader, refreshToken)
    next()  

  } catch(error) {
   
   return next(error)
  }
};
