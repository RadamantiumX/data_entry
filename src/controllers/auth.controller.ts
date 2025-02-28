import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../db/prisma.db';
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
                    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid user or password'})
                }

            const isValidPsw = await bcrypt.compare(password, user.password)
            if(!isValidPsw)
                {
                     return res.status(StatusCodes.BAD_REQUEST).json({message: 'invalid user or password'})
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

            if(!uniqueUserColab){
                return res.status(StatusCodes.BAD_REQUEST).json({message: 'Username already exists'})
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
                status: StatusCodes.BAD_REQUEST,
                message: 'Something went wrong!'
             })
         }
    }
}