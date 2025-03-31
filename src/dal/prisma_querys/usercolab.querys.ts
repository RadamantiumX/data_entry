import { prisma } from "../../db/prisma.db";
import { UserColab, UserColabClientResponse } from "../../types/types";
import bcrypt from 'bcryptjs'
import { getTimestampParsed } from "../../helper/time.helper";



export class UserColabQuerys {

    /**
 * Create a single Record <<UserColab>> (Only Super Admin)
 * @param {Pick<UserColab, "username" | "password" | "isSuperAdmin">} payload -->  Username must be unique
 * @returns {Promise<void>}
 */

    static async createRecord (payload:Pick<UserColab, "username"| "password" | "isSuperAdmin">):Promise<void>  {
  
    const hashedPassword = bcrypt.hashSync(payload.password, 10)
    await prisma.userColab.create({
        data:{
            username: payload.username,
            password: hashedPassword,
            isSuperAdmin: payload.isSuperAdmin
        }
    })

    return 
  
   
}

/**
 * Return all UserColab records (Only Super Admin)
 * @returns {Omit<UserColab, "password">, number} 
 */

  static async readCountRecords():Promise<UserColabClientResponse> {
   const [users, totalUsers] = await prisma.$transaction([
      prisma.userColab.findMany({omit:{ password:true },orderBy:{ createdAt:'desc' }}), // Password excluding from the response
      prisma.userColab.count()
   ])

   return {users, totalUsers}

}


/**
 * Get a single record  from Model UserColab (Only Super Admin)
 * @param {Pick<UserColab, "id">} payload --> Current id fromr the current single record to return
 * @returns {Promise<Omit<UserColab, "password">|null>}
 */
static async readRecord (payload:Pick<UserColab,"id">):Promise<Omit<UserColab, "password">|null> {
    const userColab = await prisma.userColab.findFirst({where:{id: payload.id}, omit:{password:true}})

    return userColab
}


/**
 * Update single record (Only Super Admin)
 * @param {Pick<UserColab, "id" | "username" | "password" | "isSuperAdmin">} payload --> Current Id from the current record (That can't be updated), and all the rest of modifiable fields
 * @returns {Promise<void>}
 */
static async updateRecord (payload:Pick<UserColab,"id" |"username"| "password" | "isSuperAdmin">):Promise<void> {
                await prisma.userColab.update({
                    where:{id: payload.id},
                    data:{
                        username: payload.username,
                        password: bcrypt.hashSync(payload.password, 10),
                        isSuperAdmin: payload.isSuperAdmin, 
                        updatedAt: getTimestampParsed()
                    }
                })

      return          
}


/**
 * Destroy a single record
 * @param {Pick<UserColab, "id">} payload --> Current Id from the current record
 * @returns {Promise<void>}
 */
static async destroyRecord (payload:Pick<UserColab,"id">):Promise<void> {
    await prisma.userColab.delete({ where: {id: payload.id} })
    return
}


}
