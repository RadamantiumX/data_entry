import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';


export class TestController{
    async showTokenOnHeader(req: Request, res:Response, next: NextFunction){
    
        res.status(StatusCodes.OK).json({message: `welcome User!!`})
    }

    async testFunction(req: Request, res:Response, next: NextFunction){
         res.status(StatusCodes.OK).json('Great! you can pass through')
    }
}