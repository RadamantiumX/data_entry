import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../middlewares/verifytoken.middleware';
import { IPayload } from '../types/types';

export class TestController{
    async showTokenOnHeader(req: Request, res:Response, next: NextFunction){
        const authHeader = req.headers.authorization
        const splitToken:string | any = authHeader?.split(' ')[1]
        const someUser:any | IPayload = await verifyToken(splitToken)
        if(!someUser) return next({status: StatusCodes.NOT_FOUND, message: 'Not found'})
        res.status(StatusCodes.OK).json({id: someUser.id})
    }
}