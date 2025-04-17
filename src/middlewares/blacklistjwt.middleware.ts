import { NextFunction, Request, Response } from 'express';


export const blackListJWT = (req:Request, res:Response, next:NextFunction) => {
    const cookies = req.cookies
   try{
    const refreshToken = cookies.jwt

   }catch(error){
    next(error)
   }
}