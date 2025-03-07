import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/prisma.db';
import bcrypt from 'bcryptjs'
import jwt from '../utils/jwt.key';
import { verifyToken } from '../helpers/verifyToken';


// TODO: Login ATTEMP SCHEMA on DB, for adding more security
export class AuthController {
    async signin (req:Request, res: Response, next: NextFunction){
        const { username, password } = req.body
        const ip = req.headers['x-forwarded-for']
        try{
            
            if(!username || !password){
                return next({
                    status: StatusCodes.BAD_REQUEST,
                    message: "Some required fields are missing to signin"
                })
            }

            const user = await prisma.userColab.findUnique({ where: {username} })
            if (!user) 
                {
                    return next({
                        status: StatusCodes.BAD_REQUEST,
                        message: 'Username or password incorrect!'
                    })
                }
                

            const isValidPsw = await bcrypt.compare(password, user.password)
            if(!isValidPsw)
                {
                    return next({
                        status: StatusCodes.BAD_REQUEST,
                        message: 'Username or password incorrect!'
                    })
                }

            const time = new Date().getTime()
            const timestampUpdate = new Date(time)
            
            // Adding DATE OF AUTHENTICATION
            const updateSignInDate = await prisma.userColab.update({where:{username:username}, data:{ lastSignIn: timestampUpdate  }})

            const token = jwt.sign({id: user.id, username: user.username, currentDate: timestampUpdate.toString()})

            res.status(StatusCodes.OK).json({response: {id:user.id, username: user.username, token: token, ip: ip}})
        }catch(error){
            return next({
                status: StatusCodes.BAD_GATEWAY,
                message: `Something went wrong --> Error: ${error}`
            })
        }
    }

    async generateColab(req:Request, res: Response, next: NextFunction){
        const {username, password} = req.body
         try{
            
            const uniqueUserColab = await prisma.userColab.findUnique({where: {username}})

            if(uniqueUserColab){
                return next({
                    status: StatusCodes.BAD_REQUEST,
                    message: 'User already exists!'
                })
            }

            const hashedPassword = bcrypt.hashSync(password, 10)

            const newUserColab = await prisma.userColab.create({
                data:{
                    username: username,
                    password: hashedPassword
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

    async verifySession(req:Request, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization
        try{
            const token:any = authHeader?.split('')[1]
            const userVerify:any = await verifyToken(token)
            if(!userVerify) return next({status: StatusCodes.UNAUTHORIZED, message: 'Not Authorized'})

            const username = userVerify.username
            const verifyUserColab = await prisma.userColab.findUnique({where: {username}})
            if(!verifyUserColab){
                return next({
                    status: StatusCodes.UNAUTHORIZED,
                    message: 'Invalid Username'
                 })
            }
            res.status(StatusCodes.OK).json({ message: `Welcome ${verifyUserColab.username}!` })
        }catch(error){
            return next({
                status: StatusCodes.UNAUTHORIZED,
                message: `Something went wrong --> Error: ${error}`
             })
        }
    }
}