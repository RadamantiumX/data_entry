import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { prismaError } from "./prisma.errors";
import { PrismaErrorType, SendingErrorPrisma } from "../types/error";
import { StatusCodes } from "http-status-codes";



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

    if(error.name === "TokenExpiredError" || error.name === "JsonWebTokenError" || error.name === "NotBeforeError" ){
        console.error(`Jason Web token Error: ${error.message} --> The server still be online`) // Only server LOG
        res.status(StatusCodes.UNAUTHORIZED).json({message: 'The session can be expired or something went wrong!'}) // Sending to the client
    }

    error.statusCode = error.statusCode || 500 // Internal ERROR
    error.status = error.status || 'error'

    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    })

    console.error(`${error} ---> The server still be online 🌐`)
  return
}