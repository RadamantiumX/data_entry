import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs'
import { UserColab, UserColabService } from '../types/types';
import { AuthService } from '../services/auth.service';
import { JWTtokenSign } from '../helper/jwt.helper';




// TODO: Login ATTEMP SCHEMA on DB, for adding more security
// TODO: Adding IP research
// TODO: Adding generate "SUPER-ADMIN" Role
// TODO: Separate Querys
/**
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
    async signin (req:Request, res: Response, next: NextFunction):Promise<void>{
       
        try{
            // Find the current UserColab
            const user:UserColabService | null = await AuthService.authUserColab(req.body)
            /*
            // Handle the conditional for the query
            if (!user){
                res.status(StatusCodes.UNAUTHORIZED).json({message:"Invalid User"})
                return
            } 
                
            // Decrypting current UserColab and comparing with the provided
            const isValidPsw = await bcrypt.compare(req.body.password, user.password)
            
            // Handle with conditional
            if(!isValidPsw){
                res.status(StatusCodes.UNAUTHORIZED).json({message: 'Username or password incorrect'})
                return
            } 

            // Adding Last time of userColab Sign In
            await updateTimeStampSignInRecord({username: user.username})

            const token = JWTtokenSign({id: user.id, username: user.username, isSuperAdmin: user.isSuperAdmin})*/

            res.status(StatusCodes.OK).json({user})
            return
        }catch(error){
            return next(error)
        }
    }   
    
   
}