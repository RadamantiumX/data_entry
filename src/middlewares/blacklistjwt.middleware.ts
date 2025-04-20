import { NextFunction, Request, Response } from 'express';
import { RerfreshTokenService } from '../services/refreshtoken.service';
import { StatusCodes } from 'http-status-codes';


export const blackListJWT = async (req:Request, res:Response, next:NextFunction) => {
    const cookies = req.cookies
   try{
    const refreshToken = cookies.jwt
    const { isValid } = await RerfreshTokenService.blackListVerify(refreshToken)
    if(!isValid){
        await RerfreshTokenService.destroyReused(refreshToken)
        res.clearCookie('jwt', {httpOnly:true})
        res.status(StatusCodes.UNAUTHORIZED).json({code:403, message:'The credentials provided is invalid'})
        return
    }
    next()
   }catch(error){
    next(error)
   }
}