import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { prismaError } from "./prisma.errors";
import { PrismaErrorType } from "../types/error";

/**
 * Catching the global Errors
 * @param err {any}
 * @param {Request}
 * @param {Response}
 * @param {NextFunction}
 * @returns {void}
 */
export const errorHandler = (error: any | PrismaErrorType, req: Request, res: Response, next: NextFunction):void =>{
    error.statusCode = error.statusCode || 500 // Internal ERROR
    error.status = error.status || 'error'

    if(
        error instanceof Prisma.PrismaClientKnownRequestError 
        ){
       const prismaErrorResponse:any = prismaError(error)

       res.status(prismaErrorResponse?.status).json({data:prismaErrorResponse?.error_data, message: prismaErrorResponse?.error_message})
       return
    }

    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    })
  return
}