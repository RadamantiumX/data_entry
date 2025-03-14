import { prisma } from "../db/prisma.db";
import { Prisma } from "@prisma/client";
import { UserColab } from "../types/types";
import bcrypt from 'bcryptjs'



export const create = async ({username, password, isSuperAdmin}:Pick<UserColab, "username"| "password" | "isSuperAdmin">) => {
   try{
    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUserColab = await prisma.userColab.create({
        data:{
            username: username,
            password: hashedPassword,
            isSuperAdmin: isSuperAdmin
        }
    })

    return newUserColab.username
   }catch(error){
       if(error instanceof Prisma.PrismaClientKnownRequestError){
         return error.code
       }
   } 
   
}