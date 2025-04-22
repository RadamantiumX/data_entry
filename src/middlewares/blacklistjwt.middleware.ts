import { NextFunction, Request, Response } from 'express';
import { RerfreshTokenService } from '../services/refreshtoken.service';
import { StatusCodes } from 'http-status-codes';

/**
 * Hanlde the BLACKLIST of the JWT
 * Using the "issuedAt" property (incorporated on decoded JWT), can be do a constranit
 * if this LIFETIME is minor, the token is deleted.
 * 
 * @param {Request} req ---> Request cookies from the client
 * @param {Response} res ---> Send a JSON with the header
 * @param {NextFunction} next --> Next middleware
 * @returns {Promise<void>}
 */
export const blackListJWT = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const cookies = req.cookies
   try{
    const refreshToken = cookies.jwt

    // Verify if is valid JWT provided
    const { isValid } = await RerfreshTokenService.blackListVerify(refreshToken)
    if(!isValid){
        await RerfreshTokenService.destroyReused(refreshToken)
        res.clearCookie('jwt', {httpOnly:true})
        res.status(StatusCodes.UNAUTHORIZED).json({code:403, message:'The credentials provided is invalid.. sorry'})
        return
    }
    next()
   }catch(error){
    next(error)
   }
}