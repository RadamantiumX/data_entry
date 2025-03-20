import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserColab, UserColabClientResponse } from '../types/types';
import { validateUser } from '../schemas/usercolab.validation';
import { createRecord, readCountRecords, readRecord, updateRecord, destroyRecord } from '../prisma_querys/usercolab.querys';

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
                    const createUser = await createRecord({username, password, isSuperAdmin}) // Prisma query function
                    res.status(StatusCodes.OK).json({ message: "Success on create user"})
                    return
       }catch(error){
        return next(error)
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
           res.status(StatusCodes.OK).json(allRecords ? {users: allRecords.users, count: allRecords.totalUsers}: {message: allRecords})
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
        const id:any = req.params.id
       try{
          const userColab = await readRecord(id) // Prisma query function
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
        const {id,username, password, isSuperAdmin} = req.body
        try{
            const validate = validateUser({username, password, isSuperAdmin})
                    if(!validate.success){
                        res.status(StatusCodes.BAD_REQUEST).json({ message: validate.error.message })
                        return
                    } 
            const userColabUpdate = await updateRecord(req.body) // Prisma query function

            res.status(StatusCodes.OK).json({ message: `User ${username} updated` })
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
        
    const {id } = req.body
    try{
        
        const deleteRecord = await destroyRecord(id) // Prisma query function
        res.status(StatusCodes.OK).json({message: 'User Deleted'})
        return
    }catch(error){
        return next(error)
    }
 
     }
}