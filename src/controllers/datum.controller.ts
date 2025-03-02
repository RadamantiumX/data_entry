import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/prisma.db';
import bcrypt from 'bcryptjs'
import jwt from '../utils/jwt.key';

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

     }catch(error){

     }
   }
}