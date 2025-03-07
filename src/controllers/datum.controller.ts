import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/prisma.db';
import { verifyToken } from '../middlewares/verifyToken';

export class DatumController{
    async saveDatum(req:Request, res: Response, next: NextFunction){
        const { emailSource, emailSourcePsw, xUser, xPsw } = req.body
        const authHeader = req.headers.authorization
        try{
           const token:any = authHeader?.split(' ')[1]
           const userVerify:any = await verifyToken(token)
           if(!userVerify) return next({status: StatusCodes.UNAUTHORIZED, message: "Not Authorized"})
           
           if(!emailSource || !emailSourcePsw || !xUser || !xPsw ){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: "Some field are required"
            })
           }
           const userColabId = userVerify.id
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

        }catch(error){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: `Something went wrong --> Error: ${error}`
            })
        }
    }

   async showDatum(req:Request, res: Response, next: NextFunction) {
     const authHeader = req.headers.authorization
     try{
        const token:any = authHeader?.split(' ')[1]
        const userVerify:any = await verifyToken(token)
        if(!userVerify) return next({status: StatusCodes.UNAUTHORIZED, message: "Not Authorized"})

        const count = await prisma.data.count()
        const datum = await prisma.data.findMany({
            orderBy: {createdAt: 'desc'}
        })
        if(!datum){
            res.status(StatusCodes.OK).json({ message: 'not found records' })
        }
        res.status(StatusCodes.OK).json({ count, datum })

     }catch(error){
        return next({
            status: StatusCodes.BAD_REQUEST,
            message: `Something went wrong --> Error: ${error}`
        })
     }
   }

   async updateDatum(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization
    const { id, emailSource,  emailSourcePsw, xUser, xPsw } = req.body
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
       
    }catch(error){
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: `Something went wrong --> Error: ${error}`,
      });
    }
}
   
   async selectForEmail(req:Request, res: Response, next: NextFunction){
    const {emailSource } = req.body
    const authHeader = req.headers.authorization
     try{
        const token:any = authHeader?.split(' ')[1]
        const userVerify:any = await verifyToken(token)
        if(!userVerify) return next({status: StatusCodes.UNAUTHORIZED, message: "Not Authorized"})
        
        const singleRecord = await prisma.data.findUnique({where: {emailSource: emailSource}, select:{id:true, emailSource: true, emailSourcePsw: true, xUser: true, xPsw:true ,apiData:{select:{
            appName: true, appId: true
        }}, apiKeys:{
            select:{
                apiKey: true, apiKeySecret: true, bearerToken: true, accessToken: true, accessTokenSecret: true
            }
        } } })  
        if(!singleRecord){
            res.status(StatusCodes.OK).json({ message: 'not found matches' })
        }  
        res.status(StatusCodes.OK).json({ singleRecord })
     }catch(error){
        return next({
            status: StatusCodes.BAD_REQUEST,
            message: `Something went wrong --> Error: ${error}`
        })
     }
   }

   async selectAllRelated(req:Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization
    try{
        const token:any = authHeader?.split(' ')[1]
        const userVerify:any = await verifyToken(token)
        if(!userVerify) return next({status: StatusCodes.UNAUTHORIZED, message: "Not Authorized"})

        const allRecords = await prisma.data.findMany({ select:{id:true, emailSource: true, emailSourcePsw: true, xUser: true, xPsw:true ,apiData:{select:{
            appName: true, appId: true
        }}, apiKeys:{
            select:{
                apiKey: true, apiKeySecret: true, bearerToken: true, accessToken: true, accessTokenSecret: true
            }
        } }})
        
        if(!allRecords){
            res.status(StatusCodes.OK).json({ message: 'not found records' })
        } 

        res.status(StatusCodes.OK).json({ data: allRecords})

    }catch(error){
        return next({
            status: StatusCodes.BAD_REQUEST,
            message: `Something went wrong --> Error: ${error}`
        })

    }
   }

   async destroyDatum(req:Request, res: Response, next: NextFunction){
    const {id } = req.body
    const authHeader = req.headers.authorization
    try{
        const token:any = authHeader?.split(' ')[1]
        const userVerify:any = await verifyToken(token)
        if(!userVerify) return next({status: StatusCodes.UNAUTHORIZED, message: "Not Authorized"})

        const deleteRecord = await prisma.data.delete({ where: {id: id} })
        
        res.status(StatusCodes.OK).json({message: 'Record deleted...'})

    }catch(error){
        return next({
            status: StatusCodes.BAD_REQUEST,
            message: `Something went wrong --> Error: ${error}`
        })
    }
   }
}