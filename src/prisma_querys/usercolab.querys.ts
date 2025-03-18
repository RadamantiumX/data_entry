import { prisma } from "../db/prisma.db";
import { UserColab, UserColabClientResponse } from "../types/types";
import bcrypt from 'bcryptjs'



/**
 * Create a single Record <<UserColab>>
 * @param {Pick<UserColab, "username" | "password" | "isSuperAdmin">} {Object} -->  Username must be unique
 * @returns {Promise<void>}
 */
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

/**
 * Return all UserColab records
 * @returns {Omit<UserColab, "password">, number} 
 */

export const readCountRecords = async():Promise<UserColabClientResponse> => {
   const [users, totalUsers] = await prisma.$transaction([
      prisma.userColab.findMany({omit:{ password:true },orderBy:{ createdAt:'desc' }}), // Password excluding from the response
      prisma.userColab.count()
   ])

   return {users, totalUsers}

}

export const readRecord = async({id}:Pick<UserColab,"id">):Promise<any> => {
    const userColab = await prisma.userColab.findFirst({where:{id: id}, omit:{password:true}})

    return {userColab}
}