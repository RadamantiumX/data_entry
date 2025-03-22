import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../db/prisma.db";
import { validateApiData } from "../schemas/apidata.validation";
import { createRecord, readCountRecords, updateRecord, destroyRecord } from '../services/prisma_querys/apidata.querys';
import { getTimestampParsed } from "../helper/time.helper";

/**
 * Controller Class For APIDATA Operations
 * CRUD METHODS: 
 *   --> saveApiData()
 *   --> showApiData()
 *   --> updateApiData()
 *   --> destroyApiData()
 * 
 */

export class ApiDataController {
  /**
   * Saves the request data on the ApiData model TABLE
   * @param {Request} req --> The HTTP request object: appName, appId and dataId
   * @param {Response} res --> Response object to the client
   * @param {NextFunction} next --> The next middleware function for error handling.
   * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
   */
  async saveApiData(req: Request, res: Response, next: NextFunction):Promise<void> {
    const { appName, appId, dataId } = req.body;
    try {
      // Fields validations
      const validation = validateApiData(req.body)
      if(!validation.success){
        res.status(StatusCodes.BAD_REQUEST).json({message: JSON.parse(validation.error.message)})
        return
      } 
      
      await createRecord(req.body)
      
      res.status(StatusCodes.OK).json({ message: "Succes on saving the new record" });
      return
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Show all RECORDS from the ApiData model TABLE
   * @param {Request} req --> The HTTP request object: appName, appId and dataId
   * @param {Response} res --> Response object to the client
   * @param {NextFunction} next --> The next middleware function for error handling.
   * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
   */
  async showApiData(req: Request, res: Response, next: NextFunction):Promise<void> {
    try {
      const apiData = await readCountRecords() 
      res.status(StatusCodes.OK).json(apiData.totalApiData > 0 ? { apiData: apiData.apidatas, count: apiData.totalApiData }: {message: "No records founded"})
      return
    } catch (error) {
      return next(error);
    }
  }
  
  /**
   * Update a single record from the ApiData model TABLE
   * @param {Request} req --> The HTTP request object: appName, appId and dataId
   * @param {Response} res --> Response object to the client
   * @param {NextFunction} next --> The next middleware function for error handling.
   * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
   */
  async updateApiData(req: Request, res: Response, next: NextFunction):Promise<void>{
      const { id, appName, appId } = req.body
      try{
      // Fields validations
      const validation = validateApiData(req.body)
      if(!validation.success){
        res.status(StatusCodes.BAD_REQUEST).json({message: JSON.parse(validation.error.message)})
        return
      } 
          
          const timestampUpdate = getTimestampParsed() // Setting the current date to modify on DB
          
          // Updating record on DB
          await updateRecord(req.body)
          res.status(StatusCodes.OK).json({ message: 'success on update record' })
          return
      }catch(error){
        return next(error);
      }
  }
  

  /**
   * Delete a single record from the ApiData model TABLE
   * @param {Request} req --> The HTTP request object: appName, appId and dataId
   * @param {Response} res --> Response object to the client
   * @param {NextFunction} next --> The next middleware function for error handling.
   * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
   */
  async destroyApiData(req: Request, res: Response, next: NextFunction):Promise<void>{
    const {id } = req.body
    try{
        const deleteRecord = await prisma.apiData.delete({ where: {id: id} })  
        res.status(StatusCodes.OK).json({message: 'Record deleted...'})
        return
    }catch(error){
        return next(error);
    }
  }
}
