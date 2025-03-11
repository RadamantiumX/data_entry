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
export class AuthController {
    async signin (req:Request, res: Response, next: NextFunction):Promise<void>{
        const { username, password }:Pick<UserColab, "username" | "password"> = req.body
        const ip:string[] | string | undefined = req.headers['x-forwarded-for']
        try{
            
            if(!username || !password) res.status(StatusCodes.BAD_REQUEST).json({message: 'Missing auth data'})

            const user:UserColab | any = await prisma.userColab.findUnique({ where: {username} })
            if (!user) res.status(StatusCodes.UNAUTHORIZED).json({message:"Invalid User"})
                

            const isValidPsw = await bcrypt.compare(password, user.password)
            if(!isValidPsw) res.status(StatusCodes.UNAUTHORIZED).json({message: 'Username or password incorrect'})

            const time = new Date().getTime()
            const timestampUpdate = new Date(time)
            
            // Adding DATE OF AUTHENTICATION
            const updateSignInDate = await prisma.userColab.update({where:{username:username}, data:{ lastSignIn: timestampUpdate  }})

            const token = jwt.sign({id: user.id, username: user.username, currentDate: timestampUpdate.toString(), isSuperAdmin: user.isSuperAdmin})

            res.status(StatusCodes.OK).json({response: {id:user.id, username: user.username, superAdmin: user.isSuperAdmin , token: token, ip: ip}})
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