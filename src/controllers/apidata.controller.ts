import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../db/prisma.db";
import { validateApiData } from "../schemas/apidata.validation";

/**
 * Controller Class For API OPERATIONS
 * CRUD METHODS
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
      if(!validation.success) res.status(StatusCodes.BAD_REQUEST).json({message: JSON.parse(validation.error.message)})
      
      // Save new record on DB  
      const saveOnDB = await prisma.apiData.create({
        data: {
          appName: appName,
          appId: appId,
          dataId: dataId,
        },
      });

      res.status(StatusCodes.OK).json({ message: "Success on saving data" });
      return
    } catch (error) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: `Something went wrong --> Error: ${error}`,
      });
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
      const count = await prisma.apiData.count() // Count all records
      const apiData = await prisma.apiData.findMany() // Query to get all records
      
      // If no have records to show
      if(!apiData){
        res.status(StatusCodes.OK).json({message: "No data displayed"})
        return
      } 
      res.status(StatusCodes.OK).json({ count, apiData })
      return
    } catch (error) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: `Something went wrong --> Error: ${error}`,
      });
    }
  }
  
  /**
   * Update a single record from the ApiData model TABLE
   * @param {Request} req --> The HTTP request object: appName, appId and dataId
   * @param {Response} res --> Response object to the client
   * @param {NextFunction} next --> The next middleware function for error handling.
   * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
   */
  async updateApiData(req: Request, res: Response, next: NextFunction){
      const { id, appName, appId } = req.body
      try{
          const time = new Date().getTime()
          const timestampUpdate = new Date(time) // Setting the current date to modify on DB
          
          const updateRecord = await prisma.apiData.update({
            where:{
              id: id
            },
            data:{
              appName: appName,
              appId: appId,
              updatedAt: timestampUpdate
            }
          })
          res.status(StatusCodes.OK).json({ message: 'success on update data' })
         
      }catch(error){
        return next({
          status: StatusCodes.BAD_REQUEST,
          message: `Something went wrong --> Error: ${error}`,
        });
      }
  }

  async destroyApiData(req: Request, res: Response, next: NextFunction){
    const {id } = req.body
    try{
        const deleteRecord = await prisma.apiData.delete({ where: {id: id} })  

        res.status(StatusCodes.OK).json({message: 'Record deleted...'})

    }catch(error){
        return next({
            status: StatusCodes.BAD_REQUEST,
            message: `Something went wrong --> Error: ${error}`,
          });
    }
  }
}
