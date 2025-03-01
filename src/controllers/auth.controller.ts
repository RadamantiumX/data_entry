import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/prisma';
import bcrypt from 'bcryptjs'
import jwt from '../utils/jwt.key';

export class AuthController {
    async signin (req:Request, res: Response, next: NextFunction){
        const { username, password } = req.body
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

            const token = jwt.sign({id: user.id, username: user.username})

            res.status(StatusCodes.OK).json({response: {id:user.id, username: user.username, token: token}})
        }catch(error){
            return next({
                status: StatusCodes.BAD_GATEWAY,
                message: 'Something went wrong!'
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
                message: 'Something went wrong!'
             })
         }
    }

    async verifySession(req:Request, res: Response, next: NextFunction){
        const {token} = req.body
        try{
            const decode:any = jwt.verify(token)
            if(!decode){
                return next({
                    status: StatusCodes.UNAUTHORIZED,
                    message: 'Invalid Token'
                 })
            }
            const username = decode.username
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
                status: StatusCodes.BAD_GATEWAY,
                message: 'Something went wrong!'
             })
        }
    }
}