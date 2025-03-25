import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {  UserColabClientResponse } from '../types/types';
import z from 'zod'
import { validateUser } from '../schemas/usercolab.validation';
import { createRecord, readCountRecords, readRecord, updateRecord, destroyRecord } from '../services/prisma_querys/usercolab.querys';

///// TODO: Check if the user is admin to access this class methods
// TODO: Lean about ZOD ERROR HANDLING on: https://zod.dev/ERROR_HANDLING
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
       try{
                   const validate = validateUser(req.body)
                   /*if(!validate.success){
                        res.status(StatusCodes.BAD_REQUEST).json({ message: validate.error.message })
                        return
                    } */
                    await createRecord(req.body) // Prisma query function
                    res.status(StatusCodes.OK).json({ message: "Success on create user"})
                    return
       }catch(error){
       if(error instanceof z.ZodError){
         res.status(StatusCodes.BAD_REQUEST).json(error.issues)
      return   
       }
     
       
       // return next(error)
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
           const allRecords:UserColabClientResponse = await readCountRecords() // Prisma query function

           // Ternary operator 
           res.status(StatusCodes.OK).json(allRecords.totalUsers > 0 ? {users: allRecords.users, count: allRecords.totalUsers}: {message: "No records founded"})
           return
        }catch(error){
         return next(error)
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
       try{
          const userColab = await readRecord(req.body) // Prisma query function
          res.status(StatusCodes.OK).json(userColab ? { user: userColab }: {message: 'No user found'})
          return
       }catch(error){
        return next(error)
       }
     }
   
    /**
     * 
     * Update a UserColab single Records -- Only Super-Admin ---
     * @param {Request} req --> The HTTP request object: appName, appId and dataId
     * @param {Response} res --> Response object to the client
     * @param {NextFunction} next --> The next middleware function for error handling.
     * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
     */ 


     async updateUserColab(req:Request, res: Response, next: NextFunction):Promise<void>{
        try{
            const validate = validateUser(req.body)
                    if(!validate.success){
                        res.status(StatusCodes.BAD_REQUEST).json({ message: validate.error.message })
                        return
                    } 
            await updateRecord(req.body) // Prisma query function

            res.status(StatusCodes.OK).json({ message: `User ${req.body.username} updated` })
            return
 
        }catch(error){
         return next(error)
        }
     }


     /**
     * 
     * Delete a UserColab single Records -- Only Super-Admin ---
     * @param {Request} req --> The HTTP request object: appName, appId and dataId
     * @param {Response} res --> Response object to the client
     * @param {NextFunction} next --> The next middleware function for error handling.
     * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
     */ 

     async destroyUserColab(req:Request, res: Response, next: NextFunction):Promise<void>{
    try{ 
        await destroyRecord(req.body) // Prisma query function
        res.status(StatusCodes.OK).json({message: 'User Deleted'})
        return
    }catch(error){
        return next(error)
    }
 
     }
}