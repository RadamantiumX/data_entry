import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {  UserColabClientResponse } from '../types/types';
import { UserColabService } from '../services/usercolab.service';

///// TODO: Check if the user is admin to access this class methods
///// TODO: Lean about ZOD ERROR HANDLING on: https://zod.dev/ERROR_HANDLING
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
    static async createUserColab(req:Request, res: Response, next: NextFunction):Promise<void>{
       try{
                    await UserColabService.createUserColab(req.body)
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

    static async getAllUserColab(req:Request, res: Response, next: NextFunction):Promise<void>{
        try{
           const allRecords:UserColabClientResponse = await UserColabService.getAllUserColab() // Prisma query function

           // Ternary
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
     static async getUserColab(req:Request, res: Response, next: NextFunction):Promise<void>{
       try{
          const userColab = await UserColabService.getUserColab(req.body) // Prisma query function
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


     static async updateUserColab(req:Request, res: Response, next: NextFunction):Promise<void>{
        try{

            await UserColabService.updateUserColab(req.body) // Prisma query function

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

     static async destroyUserColab(req:Request, res: Response, next: NextFunction):Promise<void>{
    try{ 
        await UserColabService.destroyUserColab(req.body)// Prisma query function
        res.status(StatusCodes.OK).json({message: 'User Deleted'})
        return
    }catch(error){
        return next(error)
    }
 
     }
}