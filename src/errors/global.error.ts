import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { prismaError } from "./prisma.errors";

/**
 * Catching the global Errors
 * @param err {any}
 * @param {Request}
 * @param {Response}
 * @param {NextFunction}
 * @returns {void}
 */
export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction):void =>{
    error.statusCode = error.statusCode || 500 // Internal ERROR
    error.status = error.status || 'error'

    if(error instanceof Prisma.PrismaClientKnownRequestError || Prisma.PrismaClientInitializationError || Prisma.PrismaClientUnknownRequestError || Prisma.PrismaClientRustPanicError || Prisma.PrismaClientInitializationError || Prisma.PrismaClientValidationError){
       const prismaErrorResponse = prismaError(error)

       res.status(error.statusCode).json(prismaErrorResponse)
       next()
    }

    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    })

}