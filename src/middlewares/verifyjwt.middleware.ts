import { RerfreshTokenService } from "../services/refreshtoken.service"
import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"


// TODO: add TOKEN verifing before decoding token
export const verifyJWT = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const authHeader = req.headers.authorization
    const cookies:any = req.cookies
    try{
        if(!authHeader && !cookies.jwt){
            res.status(StatusCodes.FORBIDDEN).json({code: 403, message:"Missing credentials"})
            return
        }
       const verifyTokenOwner = await RerfreshTokenService.verifyOwner(cookies)
       if(!verifyTokenOwner){
          res.status(StatusCodes.FORBIDDEN).json({code: 403, message: "Missmatching credentials"})
       }
        
    }catch(error){
        return next(error)
    }
}