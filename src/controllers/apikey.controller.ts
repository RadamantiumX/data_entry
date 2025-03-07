import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/prisma.db';
import { verifyToken } from '../middlewares/verifyToken';

export class ApiKeyController {
     async saveApiKey(req:Request, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization
        const {apiKey, apiKeySecret, bearerToken, accessToken, accessTokenSecret, apiDataId, dataId} = req.body
        try{
           const token:any = authHeader?.split(' ')[1]
           const userVerify:any = await verifyToken(token)
           if(!userVerify) return next({status: StatusCodes.UNAUTHORIZED, message: "Not Authorized"})
           
           if(!apiKey || !apiKeySecret || !bearerToken || !accessToken || !accessTokenSecret || !apiDataId || !dataId){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: "Some field are required"
            })
           }

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


        }catch(error){
            console.log(error)
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: `Something went wrong --> Error: ${error}`
            })
        }

     }

     async showApiKey(req:Request, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization
        try{
           const token:any = authHeader?.split(' ')[1]
           const userVerify:any = await verifyToken(token)
           if(!userVerify) return next({status: StatusCodes.UNAUTHORIZED, message: "Not Authorized"})

        const count = await prisma.apiKeys.count()
        const apikeys = await prisma.apiKeys.findMany()

        if(!apikeys){
            res.status(StatusCodes.OK).json({ message: 'not found records' })
        }
            res.status(StatusCodes.OK).json({ count, apikeys })
        }catch(error){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: `Something went wrong --> Error: ${error}`
            })
        }

     }

     async updateApiKeys(req: Request, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization
        const { id, apiKey, apiKeySecret, bearerToken, accessToken, accessTokenSecret } = req.body
        try{
          const token: any = authHeader?.split(" ")[1];
          const userVerify: any = await verifyToken(token);
          if (!userVerify)
            return next({
              status: StatusCodes.UNAUTHORIZED,
              message: "Not Authorized",
            });

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
          return next({
            status: StatusCodes.BAD_REQUEST,
            message: `Something went wrong --> Error: ${error}`,
          });
        }
    }

     async destroyApiKey(req:Request, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization
        const { id } = req.body
        try{
            const token:any = authHeader?.split(' ')[1]
            const userVerify:any = await verifyToken(token)
            if(!userVerify) return next({status: StatusCodes.UNAUTHORIZED, message: "Not Authorized"})

            const deleteRecord = await prisma.apiKeys.delete({where: {id : id}})

            res.status(StatusCodes.OK).json({message: 'Record deleted...'})


        }catch(error){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: `Something went wrong --> Error: ${error}`
            })
        }

     }
}