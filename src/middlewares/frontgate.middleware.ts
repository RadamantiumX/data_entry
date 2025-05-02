import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';


export const frontGate = async (req:Request, res:Response, next:NextFunction) => {
    try{
       res.status(StatusCodes.OK).json({message: 'you may enter'})
       next()
    }catch(error){
        next(error)
    }
}