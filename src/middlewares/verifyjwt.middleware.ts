import { Request, Response, NextFunction } from "express"
import { AccessTokenService } from "../services/accesstoken.service"


// TODO: add TOKEN verifing before decoding token
export const verifyJWT = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const authHeader = req.headers.authorization
    try{
        await AccessTokenService.checkOwnerCredentials(authHeader)
        next()
    }catch(error){
        return next(error)
    }
}