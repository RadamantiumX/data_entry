import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validateApiKey } from '../schemas/apiKey.validation';
import { createRecord, readCountRecords, readRecord, updateRecord, destroyRecord } from '../dal/prisma_querys/apikey.querys';


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
        
        try{
           
           await validateApiKey(req.body) // Request Body validation --> zod
           await createRecord(req.body)
           res.status(StatusCodes.OK).json({ message: "Success on saving data" })
           return

        }catch(error){
            return next(error)
        }

     }
    
      /**
     * 
     * Show all RECORDS from the apikey model TABLE
     * @param {Request} req --> The HTTP request object: appName, appId and dataId
     * @param {Response} res --> Response object to the client
     * @param {NextFunction} next --> The next middleware function for error handling.
     * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
     */
     async showApiKeys(req:Request, res: Response, next: NextFunction):Promise<void>{
        try{
        //   
        const apikeys = await readCountRecords()
        res.status(StatusCodes.OK).json(apikeys.totalApiKeys > 0 ?{ apiKeys: apikeys.apiKeys, count: apikeys.totalApiKeys }: {message: "No results founded!"})
        return
         
        }catch(error){
            return next(error)
        }

     }

    /**
       * Single for apikey model
       * @param {Request} req 
       * @param {Response} res 
       * @param {NextFunction} next 
       * @returns {Promise<void>}
       */
      async showSingleApiKey(req: Request, res: Response, next: NextFunction):Promise<void>{
         try{
          const apikey = await readRecord({id:parseInt(req.params.id)})
          res.status(StatusCodes.OK).json(apikey ? {apikey}:{message: "The related record is no founded"})
          return
         }catch(error){
          return next(error);
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
        
        try{
            await validateApiKey(req.body) // Request Body validation --> zod
            await updateRecord(req.body)
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
        
        try{
            await destroyRecord(req.body)
            res.status(StatusCodes.OK).json({message: 'Record deleted...'})
            return
        }catch(error){
            return next(error)
        }

     }
}