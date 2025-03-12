import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/prisma.db';
import bcrypt from 'bcryptjs'
import jwt from '../utils/jwt.key';
import { UserColab } from '../types/types';
import { validateUser } from '../schemas/usercolab.validation';




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
        const { username, password }:Pick<UserColab, "username" | "password"> = req.body
        // const ip:string[] | string | undefined = req.headers['x-forwarded-for']

        // Handle the REQUEST BODY object
        if(!username || !password){
            res.status(StatusCodes.BAD_REQUEST).json({message: 'Missing auth data'})
            return
        } 
        try{
            // Find the current UserColab
            const user:UserColab | any = await prisma.userColab.findUnique({ where: {username} })
            
            // Handle the conditional for the query
            if (!user){
                res.status(StatusCodes.UNAUTHORIZED).json({message:"Invalid User"})
                return
            } 
                
            // Decrypting current UserColab and comparing with the provided
            const isValidPsw = await bcrypt.compare(password, user.password)
            
            // Handle with conditional
            if(!isValidPsw){
                res.status(StatusCodes.UNAUTHORIZED).json({message: 'Username or password incorrect'})
                return
            } 
            // Get current Time and parsing to Timestamp
            const time = new Date().getTime()
            const timestampUpdate = new Date(time)
            
            // Adding DATE OF AUTHENTICATION
            const updateSignInDate = await prisma.userColab.update({where:{username:username}, data:{ lastSignIn: timestampUpdate  }})

            const token = jwt.sign({id: user.id, username: user.username, currentDate: timestampUpdate.toString(), isSuperAdmin: user.isSuperAdmin})

            res.status(StatusCodes.OK).json({response: { id:user.id, username: user.username, superAdmin: user.isSuperAdmin , token: token }})
            return
        }catch(error){
            return next({
                status: StatusCodes.BAD_GATEWAY,
                message: `Something went wrong --> Error: ${error}`
            })
        }
    }
    
    async generateColab(req:Request, res: Response, next: NextFunction){
        const {username, password, isSuperAdmin}:Pick<UserColab, "username" | "password" | "isSuperAdmin"> = req.body
         try{
            const validate = validateUser(req.body)
            if(!validate.success) res.status(StatusCodes.BAD_REQUEST).json({ message: validate.error.message })

            const uniqueUserColab = await prisma.userColab.findUnique({where: {username}})

            if(uniqueUserColab) res.status(StatusCodes.BAD_REQUEST).json({message: 'Username already exists'})

            const hashedPassword = bcrypt.hashSync(password, 10)

            const newUserColab = await prisma.userColab.create({
                data:{
                    username: username,
                    password: hashedPassword,
                    isSuperAdmin: isSuperAdmin
                }
            })

            res.status(StatusCodes.OK).json({ message: "User register successfully" })
         }catch(error){
            return next({
                status: StatusCodes.BAD_GATEWAY,
                message: `Something went wrong --> Error: ${error}`
             })
         }
    }

   
}