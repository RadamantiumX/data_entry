import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { prismaError } from "./prisma.errors";
import { PrismaErrorType, SendingErrorPrisma } from "../types/error";



/**
 * Catching the global Errors
 * @param err {any}
 * @param {Request}
 * @param {Response}
 * @param {NextFunction}
 * @returns {void}
 */
export const errorHandler = (error: any | PrismaErrorType, req: Request, res: Response, next: NextFunction):void =>{
    

    if(
        error instanceof Prisma.PrismaClientKnownRequestError 
        ){
          
       const prismaErrorResponse:SendingErrorPrisma | any = prismaError(error)

       res.status(prismaErrorResponse?.http_status).json({prismaException:prismaErrorResponse?.error_data, message: prismaErrorResponse?.error_message, http_status: prismaErrorResponse.http_status})
       return
    }

    error.statusCode = error.statusCode || 500 // Internal ERROR
    error.status = error.status || 'error'

    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    })

    console.error(`${error}---> The server still be online 🌐`)
  return
}