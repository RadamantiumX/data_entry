import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validateApiData } from "../schemas/apidata.validation";
import { createRecord, readCountRecords, readRecord, updateRecord, destroyRecord } from '../services/prisma_querys/apidata.querys';
import { ApiDataClientResponse } from "../types/types";

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
    try {
      // Fields validations
      await validateApiData(req.body)
     
      
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
  async showApiDatas(req: Request, res: Response, next: NextFunction):Promise<void> {
    try {
      const apiDatas:ApiDataClientResponse | null | any = await readCountRecords() 
      res.status(StatusCodes.OK).json(apiDatas.totalApiData > 0 ? { apiData: apiDatas?.apiDatas, count: apiDatas?.totalApiData }: {message: "No records founded"})
      return
    } catch (error) {
      return next(error);
    }
  }
  /**
   * Single for APIDATA model
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   * @returns {Promise<void>}
   */
  async showSingleApiData(req: Request, res: Response, next: NextFunction):Promise<void>{
     try{
      const apiData = await readRecord({id:parseInt(req.params.id)})
      res.status(StatusCodes.OK).json(apiData ? {apiData}:{message: "The related record is no founded"})
      return
     }catch(error){
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
      try{
      // Fields validations
      await validateApiData(req.body)
      
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
    try{
        await destroyRecord(req.body)
        res.status(StatusCodes.OK).json({message: 'Record deleted...'})
        return
    }catch(error){
        return next(error);
    }
  }
}
