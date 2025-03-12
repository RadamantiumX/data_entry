import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/prisma.db';
import bcrypt from 'bcryptjs'
import jwt from '../utils/jwt.key';
import { UserColab } from '../types/types';
import { validateUser } from '../schemas/usercolab.validation';

///// TODO: Check if the user is admin to access this class methods
/**
 * UserColabController class for UserColab Table CRUD methods
 * ‼️Only Super-Admin
 */
export class UserColabController{
    /**
     * 
     * New UserColab creation -- Only Super-Admin ---
     * @param {Request} req --> The HTTP request object: appName, appId and dataId
     * @param {Response} res --> Response object to the client
     * @param {NextFunction} next --> The next middleware function for error handling.
     * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
     */
    async createUserColab(req:Request, res: Response, next: NextFunction):Promise<void>{
        const {username, password, isSuperAdmin}:Pick<UserColab, "username" | "password" | "isSuperAdmin"> = req.body
       try{
        const validate = validateUser(req.body)
                    if(!validate.success){
                        res.status(StatusCodes.BAD_REQUEST).json({ message: validate.error.message })
                        return
                    } 
        
                    const uniqueUserColab = await prisma.userColab.findUnique({where: {username}})
        
                    if(uniqueUserColab) {
                        res.status(StatusCodes.BAD_REQUEST).json({message: 'Username already exists'})
                        return
                    }
                    const hashedPassword = bcrypt.hashSync(password, 10)
        
                    const newUserColab = await prisma.userColab.create({
                        data:{
                            username: username,
                            password: hashedPassword,
                            isSuperAdmin: isSuperAdmin
                        }
                    })
        
                    res.status(StatusCodes.OK).json({ message: "New user created" })
                    return
       }catch(error){
        return next({
            status: StatusCodes.BAD_GATEWAY,
            message: `Something went wrong --> Error: ${error}`
        })
       }
    }

    /**
     * 
     * Listing UserColab Records & count -- Only Super-Admin ---
     * @param {Request} req --> The HTTP request object: appName, appId and dataId
     * @param {Response} res --> Response object to the client
     * @param {NextFunction} next --> The next middleware function for error handling.
     * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
     */

    async showUserColab(req:Request, res: Response, next: NextFunction):Promise<void>{
        try{
 
        }catch(error){
         return next({
             status: StatusCodes.BAD_GATEWAY,
             message: `Something went wrong --> Error: ${error}`
         })
        }
     }
   /**
     * 
     * Select a single UserColab record -- Only Super-Admin ---
     * @param {Request} req --> The HTTP request object: appName, appId and dataId
     * @param {Response} res --> Response object to the client
     * @param {NextFunction} next --> The next middleware function for error handling.
     * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
     */ 
     async selectUserColab(req:Request, res: Response, next: NextFunction):Promise<void>{
        const {id} = req.body
       try{
          const userColab = await prisma.userColab.findFirst({where:{id: id}})

          // Handle --> Not results found
          if(!userColab){
            res.status(StatusCodes.OK).json({message: 'User not found'})
            return
          }
          res.status(StatusCodes.OK).json({ user: userColab })
          return
       }catch(error){
        return next({
            status: StatusCodes.BAD_GATEWAY,
            message: `Something went wrong --> Error: ${error}`
        })
       }
     }
   
    /**
     * 
     * Listing UserColab Records & count -- Only Super-Admin ---
     * @param {Request} req --> The HTTP request object: appName, appId and dataId
     * @param {Response} res --> Response object to the client
     * @param {NextFunction} next --> The next middleware function for error handling.
     * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
     */ 
     async updateUserColab(req:Request, res: Response, next: NextFunction):Promise<void>{
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