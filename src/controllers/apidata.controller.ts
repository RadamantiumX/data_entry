import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../db/prisma.db";
import { verifyToken } from "../helpers/verifyToken";

export class ApiDataController {
  async saveApiData(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const { appName, appId, dataId } = req.body;
    try {
      const token: any = authHeader?.split(" ")[1];
      const userVerify: any = await verifyToken(token);
      if (!userVerify)
        return next({
          status: StatusCodes.UNAUTHORIZED,
          message: "Not Authorized",
        });

      if (!appName || !appId || !dataId)
        return next({
          status: StatusCodes.BAD_REQUEST,
          message: "Missing data",
        });

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
    const authHeader = req.headers.authorization;
    try {
      const token: any = authHeader?.split(" ")[1];
      const userVerify: any = await verifyToken(token);
      if (!userVerify)
        return next({
          status: StatusCodes.UNAUTHORIZED,
          message: "Not Authorized",
        });
      
      const count = await prisma.apiData.count()
      const apiData = await prisma.apiData.findMany()  
      if(!apiData){
        res.status(StatusCodes.OK).json({message: 'not found api data'})
      }

      res.status(StatusCodes.OK).json({ count, apiData })

    } catch (error) {
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: `Something went wrong --> Error: ${error}`,
      });
    }
  }

  async updateApiData(req: Request, res: Response, next: NextFunction){
      const authHeader = req.headers.authorization
      const { id } = req.body
      try{
        const token: any = authHeader?.split(" ")[1];
        const userVerify: any = await verifyToken(token);
        if (!userVerify)
          return next({
            status: StatusCodes.UNAUTHORIZED,
            message: "Not Authorized",
          });
         
      }catch(error){
        return next({
          status: StatusCodes.BAD_REQUEST,
          message: `Something went wrong --> Error: ${error}`,
        });
      }
  }

  async destroyApiData(req: Request, res: Response, next: NextFunction){
    const {id } = req.body
    const authHeader = req.headers.authorization
    try{
        const token: any = authHeader?.split(" ")[1];
      const userVerify: any = await verifyToken(token);
      if (!userVerify)
        return next({
          status: StatusCodes.UNAUTHORIZED,
          message: "Not Authorized",
        });

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
