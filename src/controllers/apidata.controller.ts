import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../db/prisma.db";
import { validateApiData } from "../schemas/apidata.validation";

export class ApiDataController {
  async saveApiData(req: Request, res: Response, next: NextFunction) {
    const { appName, appId, dataId } = req.body;
    try {
      const validation = validateApiData(req.body)
      if(!validation.success) res.status(StatusCodes.BAD_REQUEST).json({message: JSON.parse(validation.error.message)})

      const saveOnDB = await prisma.apiData.create({
        data: {
          appName: appName,
          appId: appId,
          dataId: dataId,
        },
      });

      res.status(StatusCodes.OK).json({ message: "Success on saving data" });
    } catch (error) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: `Something went wrong --> Error: ${error}`,
      });
    }
  }

  async showApiData(req: Request, res: Response, next: NextFunction) {
    try {
      const count = await prisma.apiData.count()
      const apiData = await prisma.apiData.findMany()  
      if(!apiData) res.status(StatusCodes.OK).json({message: "No data displayed"})
      res.status(StatusCodes.OK).json({ count, apiData })
    } catch (error) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: `Something went wrong --> Error: ${error}`,
      });
    }
  }

  async updateApiData(req: Request, res: Response, next: NextFunction){
      const { id, appName, appId } = req.body
      try{
          const time = new Date().getTime()
          const timestampUpdate = new Date(time)
          
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
