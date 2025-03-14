import { Request, Response, NextFunction } from "express";

/**
 * Catching the global Errors
 * @param err {any}
 * @param {Request}
 * @param {Response}
 * @param {NextFunction}
 * @returns {void}
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction):void =>{
    console.error("Error: ", err)

    res.status(err.status || 500).json({
        message: err.message || "Something went wrong!"
    })

}