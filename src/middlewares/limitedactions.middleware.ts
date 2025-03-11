import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/prisma.db';

export const limitedActions = async (req:Request, res: Response, next: NextFunction) => {
    const {role} = req.body

    if(!role){
        res.status(StatusCodes.UNAUTHORIZED).json({message:'You are not SUPER ADMIN'})
    }
    next()
}