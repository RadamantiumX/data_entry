import { prisma } from "../db/prisma.db";
import { UserColab } from "../types/types";
import bcrypt from 'bcryptjs'



export const createRecord = async ({username, password, isSuperAdmin}:Pick<UserColab, "username"| "password" | "isSuperAdmin">):Promise<void> => {
  
    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUserColab = await prisma.userColab.create({
        data:{
            username: username,
            password: hashedPassword,
            isSuperAdmin: isSuperAdmin
        }
    })

    return 
  
   
}


export const readCountRecords = async():Promise<any> => {
   const [users, totalUsers] = await prisma.$transaction([
      prisma.userColab.findMany({omit:{ password:true },orderBy:{ createdAt:'desc' }}), // Password excluding from the response
      prisma.userColab.count()
   ])

   return {users, totalUsers}

}

export const readRecord = async({id}:Pick<UserColab,"id">):Promise<any> => {
    const userColab = await prisma.userColab.findFirst({where:{id: id}})

    return {userColab}
}