import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/prisma.db';
import { validateDatum } from '../schemas/datum.validation';

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
        const { emailSource, emailSourcePsw, xUser, xPsw, userColabId } = req.body
        try{
           // Body validation & handle conditional
           const validate = validateDatum(req.body)
           if(!validate.success){
            res.status(StatusCodes.BAD_REQUEST).json({ message: validate.error.message })
            return
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
        const datum = await prisma.data.findMany({
            orderBy: {createdAt: 'desc'}
        })

        if(!datum){
            res.status(StatusCodes.OK).json({ message: 'not found records' })
            return
        } 

        const count = await prisma.data.count()
        res.status(StatusCodes.OK).json({ count, datum })
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
    const { id, emailSource,  emailSourcePsw, xUser, xPsw } = req.body
    try{
        // Getting and parseing current Timestamp
        const time = new Date().getTime()
        const timestampUpdate = new Date(time)

        const updateRecord = await prisma.data.update({
          where:{
            id: id
          },
          data:{
            emailSource: emailSource,
            emailSourcePsw: emailSourcePsw,
            xUser: xUser,
            xPsw: xPsw,
            updatedAt: timestampUpdate
          }
        })
        res.status(StatusCodes.OK).json({ message: 'success on update data' })
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
    const {emailSource } = req.body
     try{
        // Find the current record with the "emailSource" provided
        const singleRecord = await prisma.data.findUnique({where: {emailSource: emailSource}, select:{id:true, emailSource: true, emailSourcePsw: true, xUser: true, xPsw:true ,apiData:{select:{
            appName: true, appId: true
        }}, apiKeys:{
            select:{
                apiKey: true, apiKeySecret: true, bearerToken: true, accessToken: true, accessTokenSecret: true
            }
        } } })  

        if(!singleRecord) res.status(StatusCodes.OK).json({ message: 'not found matches' })
        
        res.status(StatusCodes.OK).json({ singleRecord })
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
        const allRecords = await prisma.data.findMany({ select:{id:true, emailSource: true, emailSourcePsw: true, xUser: true, xPsw:true ,apiData:{select:{
            appName: true, appId: true
        }}, apiKeys:{
            select:{
                apiKey: true, apiKeySecret: true, bearerToken: true, accessToken: true, accessTokenSecret: true
            }
        } }})
        
        // Handle missing records
        if(!allRecords){
             res.status(StatusCodes.OK).json({ message: 'not found records' })
             return
        }
        
        res.status(StatusCodes.OK).json({ data: allRecords})
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
    const {id } = req.body
    try{
        const deleteRecord = await prisma.data.delete({ where: {id: id} })
        res.status(StatusCodes.OK).json({message: 'Record deleted...'})
        return
    }catch(error){
        return next(error)
    }
   }
}