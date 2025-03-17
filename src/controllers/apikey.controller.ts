import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/prisma.db';
import { validateApiKey } from '../schemas/apiKey.validation';


/**
 * Controller Class For APIKEY Operations 
 * CRUD methods:
 *  --> saveApiKey()
 *  --> showApiKey()
 *  --> updateApiKey()
 *  --> destroyApiKey()
 * 
 */
export class ApiKeyController {
    /**
     * 
     * Saves the request data on the ApiKey model TABLE
     * @param {Request} req --> The HTTP request object: appName, appId and dataId
     * @param {Response} res --> Response object to the client
     * @param {NextFunction} next --> The next middleware function for error handling.
     * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
     */
     async saveApiKey(req:Request, res: Response, next: NextFunction):Promise<void>{
        const {apiKey, apiKeySecret, bearerToken, accessToken, accessTokenSecret, apiDataId, dataId} = req.body
        try{
           
           const validation = validateApiKey(req.body) // Request Body validation --> zod

           // Handling validation
           if(!validation.success){
            res.status(StatusCodes.BAD_REQUEST).json({ message: validation.error.message})
            return
           } 
           
           // Save a new record
           const saveOnDB = await prisma.apiKeys.create({
              data:{
                apiKey: apiKey,
                apiKeySecret: apiKeySecret,
                bearerToken: bearerToken,
                accessToken: accessToken,
                accessTokenSecret: accessTokenSecret,
                apiDataId: apiDataId,
                dataId: dataId
              }
            
           })
           res.status(StatusCodes.OK).json({ message: "Success on saving data" })
           return

        }catch(error){
            return next(error)
        }

     }
    
      /**
     * 
     * Show all RECORDS from the ApiData model TABLE
     * @param {Request} req --> The HTTP request object: appName, appId and dataId
     * @param {Response} res --> Response object to the client
     * @param {NextFunction} next --> The next middleware function for error handling.
     * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
     */
     async showApiKey(req:Request, res: Response, next: NextFunction):Promise<void>{
        try{
        
        //   
        
        const apikeys = await prisma.apiKeys.findMany()
        
        // Handling records
        if(!apikeys) {
          res.status(StatusCodes.OK).json({ message: 'not found records' })
          return
        }
        // Count records
        const count = await prisma.apiKeys.count()
        res.status(StatusCodes.OK).json({ count, apikeys })
        return
         
        }catch(error){
            return next(error)
        }

     }
     /**
     * 
     * Update a single RECORD from the ApiKey model TABLE
     * @param {Request} req --> The HTTP request object: appName, appId and dataId
     * @param {Response} res --> Response object to the client
     * @param {NextFunction} next --> The next middleware function for error handling.
     * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
     */
     async updateApiKeys(req: Request, res: Response, next: NextFunction):Promise<void>{
        const { id, apiKey, apiKeySecret, bearerToken, accessToken, accessTokenSecret } = req.body
        try{
            const time = new Date().getTime()
            const timestampUpdate = new Date(time)
  
            const updateRecord = await prisma.apiKeys.update({
              where:{
                id: id
              },
              data:{
                apiKey: apiKey,
                apiKeySecret: apiKeySecret,
                bearerToken: bearerToken,
                accessToken: accessToken,
                accessTokenSecret: accessTokenSecret,
                updatedAt: timestampUpdate
              }
            })
            res.status(StatusCodes.OK).json({ message: 'success on update data' })
           
        }catch(error){
          return next(error);
        }
    }
    /**
     * 
     * Delete a single RECORD from the ApiKey model TABLE
     * @param {Request} req --> The HTTP request object: appName, appId and dataId
     * @param {Response} res --> Response object to the client
     * @param {NextFunction} next --> The next middleware function for error handling.
     * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
     */

     async destroyApiKey(req:Request, res: Response, next: NextFunction):Promise<void>{
        const { id } = req.body
        try{
            const deleteRecord = await prisma.apiKeys.delete({where: {id : id}})
            res.status(StatusCodes.OK).json({message: 'Record deleted...'})
            return
        }catch(error){
            return next(error)
        }

     }
}