import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RerfreshTokenService } from '../services/refreshtoken.service';

// only for refresh token expire
// All ERRORS can handlde on global errors
export class RefreshTokenController{
   static async handleRefreshToken(req:Request, res:Response, next:NextFunction){
      const cookies = req.cookies
        try{
        const refreshToken = cookies.jwt 
        if(!refreshToken){
          res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized: The access is restricted only for authorized users" })  
          return
        }  
        
        // Clear the refresh token cookie
        // TODO: Adding more secures options
        res.clearCookie('jwt', {httpOnly:true})

        // Check the user owner of the Refresh Token
        const owner = await RerfreshTokenService.verifyOwner(refreshToken)
        if(!owner){
          res.status(StatusCodes.FORBIDDEN).json({code:403, message: 'Attempt to use wrong crendentials'})
          return
        }
        const accessTokenRefreshed = await RerfreshTokenService.signAccessToken(refreshToken)
        res.status(StatusCodes.OK).json({accessToken: accessTokenRefreshed})
        return
        }catch(error){
          next(error)
        }
   }
}