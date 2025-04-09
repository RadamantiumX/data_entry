import { SECRET_KEY } from "../utils/jwt.methods"
import jwt from 'jsonwebtoken'
import { JsonWebTokenError } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

export const verifyJWT = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const authHeader = req.headers.authorization
    try{

        res.cookie
    }catch(error){
        return next(error)
    }
}