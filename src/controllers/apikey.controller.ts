import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/prisma.db';
import { verifyToken } from '../helpers/verifyToken';

export class ApiKeyController {
     async saveApiKey(req:Request, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization
        try{
           const token:any = authHeader?.split(' ')[1]
           const userVerify:any = verifyToken(token)
           if(!userVerify) return next({status: StatusCodes.UNAUTHORIZED, message: "Not Authorized"})

        }catch(error){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: `Something went wrong --> Error: ${error}`
            })
        }

     }

     async showApiKey(req:Request, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization
        try{
           const token:any = authHeader?.split(' ')[1]
           const userVerify:any = verifyToken(token)
           if(!userVerify) return next({status: StatusCodes.UNAUTHORIZED, message: "Not Authorized"})

        }catch(error){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: `Something went wrong --> Error: ${error}`
            })
        }

     }

     async destroyApiKey(req:Request, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization
        try{
            const token:any = authHeader?.split(' ')[1]
            const userVerify:any = verifyToken(token)
            if(!userVerify) return next({status: StatusCodes.UNAUTHORIZED, message: "Not Authorized"})

        }catch(error){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: `Something went wrong --> Error: ${error}`
            })
        }

     }
}