import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/prisma.db';
import bcrypt from 'bcryptjs'
import jwt from '../utils/jwt.key';

// TODO: Check if the user is admin to access this class methods

export class UserColabController{
    async createUserColab(req:Request, res: Response, next: NextFunction){
        const {} = req.body
        const authHeader = req.headers.authorization
       try{

       }catch(error){
        return next({
            status: StatusCodes.BAD_GATEWAY,
            message: `Something went wrong --> Error: ${error}`
        })
       }
    }

    async showUserColab(req:Request, res: Response, next: NextFunction){
        try{
 
        }catch(error){
         return next({
             status: StatusCodes.BAD_GATEWAY,
             message: `Something went wrong --> Error: ${error}`
         })
        }
     }

     async updateUserColab(req:Request, res: Response, next: NextFunction){
        try{
 
        }catch(error){
         return next({
             status: StatusCodes.BAD_GATEWAY,
             message: `Something went wrong --> Error: ${error}`
         })
        }
     }

     async destroyUserColab(req:Request, res: Response, next: NextFunction){
        try{
 
        }catch(error){
         return next({
             status: StatusCodes.BAD_GATEWAY,
             message: `Something went wrong --> Error: ${error}`
         })
        }
     }
}