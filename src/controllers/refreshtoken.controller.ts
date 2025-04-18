import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

// only for refresh token expire
// All ERRORS can handlde on global errors
export class RefreshTokenController{
   static async handleRefreshToken(req:Request, res:Response, next:NextFunction){
      const cookies = req.cookies
        try{
        const refreshToken = cookies.jwt 
        if(!refreshToken) res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized: The access is restricted only for authorized users" })   
        
        // Clear the refresh token cookie
        // TODO: Adding more secures options
        res.clearCookie('jwt', {httpOnly:true})

        }catch(error){
          next(error)
        }
   }
}