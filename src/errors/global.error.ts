import { Request, Response, NextFunction } from "express";


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

    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    })
}