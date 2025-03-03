import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class TestController{
    showTokenOnHeader(req: Request, res:Response, next: NextFunction){
        const authHeader = req.headers.authorization
        const splitToken = authHeader?.split(' ')[1]
        res.status(StatusCodes.OK).json({token: splitToken})
    }
}