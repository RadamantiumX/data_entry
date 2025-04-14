import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class RefreshTokenController{
   async handleRefreshToken(req:Request, res:Response, next:NextFunction){
      const cookies = req.cookies
        try{
        const refreshToken = cookies.jwt 
        if(!refreshToken) res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized: The access is restricted only for authorized users" })   

        }catch(error){
          next(error)
        }
   }
}