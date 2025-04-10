import { SECRET_KEY } from "../utils/jwt.methods"
import jwt from 'jsonwebtoken'
import { JsonWebTokenError } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"

export const verifyJWT = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const authHeader = req.headers.authorization
    const cookies = req.cookies
    try{
        if(!authHeader || !cookies.jwt){
            res.status(StatusCodes.FORBIDDEN).json({code: 403, message:"Missing credentials"})
            return
        }

        
    }catch(error){
        return next(error)
    }
}