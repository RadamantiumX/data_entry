import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class AuthController {
    async signin (req:Request, res: Response, next: NextFunction){
        const { username, password } = req.body
        try{
            if(!username || !password){
                return next({
                    status: StatusCodes.UNAUTHORIZED,
                    message: "Some required fields are missing to signin"
                })
            }
        }catch(error){
            return next({
                status: StatusCodes.BAD_GATEWAY,
                message: 'Something went wrong!'
            })
        }
    }
}