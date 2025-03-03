import { NextFunction, Request, Response, json } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/prisma.db';
import jwt from '../utils/jwt.key';
import { verifyToken } from '../helpers/verifyToken';

export class DatumController{
    async saveDatum(req:Request, res: Response, next: NextFunction){
        const { emailSource, emailSourcePsw, xUser, xPsw, userColabId } = req.body
        try{
           if(!emailSource || !emailSourcePsw || !xUser || !xPsw || !userColabId){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: "Some field are required"
            })
           }
           const saveOnDB = await prisma.data.create({
            data: {
                emailSource: emailSource,
                emailSourcePsw: emailSourcePsw,
                xUser: xUser,
                xPsw: xPsw,
                userColabId: userColabId
            }
           })
           res.status(StatusCodes.OK).json({ message: "Success on saving data" })

        }catch(error){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: `Something went wrong --> Error: ${error}`
            })
        }
    }

   async showDatum(req:Request, res: Response, next: NextFunction) {
     try{
        const count = await prisma.data.count()
        const datum = await prisma.data.findMany({
            orderBy: {createdAt: 'desc'}
        })
        if(!datum){
            res.status(StatusCodes.OK).json({ message: 'not found records' })
        }
        res.status(StatusCodes.OK).json({ count, datum })

     }catch(error){
        return next({
            status: StatusCodes.BAD_REQUEST,
            message: `Something went wrong --> Error: ${error}`
        })
     }
   }

   async destroyDatum(req:Request, res: Response, next: NextFunction){
    const {id, token} = req.body
    try{
        const userVerify = verifyToken(token)
        if(!userVerify) return next({status: StatusCodes.UNAUTHORIZED, message: "Not Authorized"})

        const deleteRecord = await prisma.data.delete({ where: {id: id} })
        
        res.status(StatusCodes.OK).json({message: 'Record deleted...'})

    }catch(error){
        return next({
            status: StatusCodes.BAD_REQUEST,
            message: `Something went wrong --> Error: ${error}`
        })
    }
   }
}