import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"
import { AccessTokenService } from "../services/accesstoken.service"
import { UserColab } from "../types/types"


// TODO: add TOKEN verifing before decoding token
export const verifyJWT = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const authHeader = req.headers.authorization
    try{
        const validateToken:Pick<UserColab, "isSuperAdmin"|"id"> | null = await AccessTokenService.checkOwnerCredentials(authHeader)
        if(!validateToken){
            res.status(StatusCodes.UNAUTHORIZED).json({message: 'invalid credentials provided'})
        }
        next()
    }catch(error){
        return next(error)
    }
}