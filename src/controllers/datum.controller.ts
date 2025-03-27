import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/prisma.db';
import { validateDatum } from '../schemas/datum.validation';
import { createRecord, readCountRecords, readRecord, updateRecord, destroyRecord, readAllRelated, readUniqueEmail } from '../services/prisma_querys/datum.query';


/**
 * Controller Class For APIDATA Operations
 * CRUD METHODS: 
 *   --> saveDatum()
 *   --> showDatum()
 *   --> selectForEmail()
 *   --> selectAllRelated()
 *   --> updateDatum()
 *   --> destroyDatum()
 * 
 */
export class DatumController{
    /**
     * 
     * Saves the request data on the Datum model TABLE
     * @param {Request} req --> The HTTP request object: appName, appId and dataId
     * @param {Response} res --> Response object to the client
     * @param {NextFunction} next --> The next middleware function for error handling.
     * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
     */
    async saveDatum(req:Request, res: Response, next: NextFunction):Promise<void>{
        try{
           // Body validation & handle conditional
           await validateDatum(req.body)
           await createRecord(req.body)
           res.status(StatusCodes.OK).json({ message: "Success on saving data" })
           return
        }catch(error){
            return next(error)
        }
    }
  
    /**
     * 
     * Show the request data on the Datum model TABLE
     * @param {Request} req --> The HTTP request object: appName, appId and dataId
     * @param {Response} res --> Response object to the client
     * @param {NextFunction} next --> The next middleware function for error handling.
     * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
     */ 
   async showDatum(req:Request, res: Response, next: NextFunction):Promise<void> {
     try{
        // Select query for all records on related table model
        const datum = await readCountRecords()
        res.status(StatusCodes.OK).json( datum.totalData > 0 ? { data: datum.data, count: datum.totalData } : {message: 'No data founded'})
        return
     }catch(error){
        return next(error)
     }
   }
   /**
     * 
     * Update single record on the Datum model TABLE
     * @param {Request} req --> The HTTP request object: appName, appId and dataId
     * @param {Response} res --> Response object to the client
     * @param {NextFunction} next --> The next middleware function for error handling.
     * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
     */ 
   async updateDatum(req: Request, res: Response, next: NextFunction):Promise<void>{
    try{
        // Body validation & handle conditional
        await validateDatum(req.body)
        
        await updateRecord(req.body)
        res.status(StatusCodes.OK).json({ message: 'Success on update data' })
        return
    }catch(error){
      return next(error);
    }
}
    /**
     * 
     * Select related record with the email provided on the Datum model TABLE
     * @param {Request} req --> The HTTP request object: appName, appId and dataId
     * @param {Response} res --> Response object to the client
     * @param {NextFunction} next --> The next middleware function for error handling.
     * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
     */ 
   async selectForEmail(req:Request, res: Response, next: NextFunction):Promise<void>{
    
     try{
        // Find the current record with the "emailSource" provided
        const uniqueRecordEmail = await readUniqueEmail({emailSource:req.params.email}) 
        res.status(StatusCodes.OK).json(uniqueRecordEmail ? {uniqueRecordEmail}: {message: 'No resource founded...'})
     }catch(error){
        return next(error)
     }
   }


   /**
     * 
     * Select all nested records from Datum table model
     * @param {Request} req --> The HTTP request object: appName, appId and dataId
     * @param {Response} res --> Response object to the client
     * @param {NextFunction} next --> The next middleware function for error handling.
     * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
     */ 
   async selectAllRelated(req:Request, res: Response, next: NextFunction):Promise<void>{
    try{
        // Select the record and nested data (ApiData & ApiKey)
        const allRelatedRecords = await readAllRelated()
        res.status(StatusCodes.OK).json(allRelatedRecords.length > 0 ? { allRelatedRecords } : { message: 'No resource founded...' })
        return
    }catch(error){
        return next(error)

    }
   }
  
   /**
     * 
     * Delete a single record from Datum table model
     * @param {Request} req --> The HTTP request object: appName, appId and dataId
     * @param {Response} res --> Response object to the client
     * @param {NextFunction} next --> The next middleware function for error handling.
     * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
     */ 
   async destroyDatum(req:Request, res: Response, next: NextFunction):Promise<void>{
    try{
        await destroyRecord(req.body)
        res.status(StatusCodes.OK).json({message: 'Record deleted...'})
        return
    }catch(error){
        return next(error)
    }
   }
}