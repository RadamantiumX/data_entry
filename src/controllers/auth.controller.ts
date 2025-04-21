import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {  UserColabService } from '../types/types';
import { AuthService } from '../services/auth.service';
import { cookieOptions } from '../config/options.config';
import { COOKIE_EXP } from '../constants/index.constants';



// TODO: Login ATTEMP SCHEMA on DB, for adding more security
// TODO: Adding IP research
// TODO: Adding generate "SUPER-ADMIN" Role
// TODO: Separate Querys
/**s
 * Controller Class For AUTHENTICATION only
 * AUTH methods:
 *  --> signin()
 * 
 */
export class AuthController {
    /**
     * 
     * Verify if the current UserColab exists on the records
     * @param {Request} req --> The HTTP request object: appName, appId and dataId
     * @param {Response} res --> Response object to the client
     * @param {NextFunction} next --> The next middleware function for error handling.
     * @returns {Promise<void>} --> Sends a response indicating success or validation failure.
     */
    static async signin (req:Request, res: Response, next: NextFunction):Promise<void>{
       
        try{
            // Using the UserColab Service
            const user:UserColabService = await AuthService.authUserColab(req.body)
            res.cookie('jwt', user.refreshToken, cookieOptions(COOKIE_EXP)) // Saving the RT into cookies
            res.status(StatusCodes.OK).json({user})
            return
        }catch(error){
            return next(error)
        }
    } 
    
    static async logout(req:Request, res: Response, next: NextFunction):Promise<void>{
        const cookies = req.cookies
        try{
            const refreshToken = cookies.jwt
            await AuthService.authDestroySession(refreshToken)
            res.clearCookie('jwt')
            res.status(StatusCodes.OK).json({message: 'good bye!'})
            return
        }catch(error){
            
        }
    }
   
}