import { prisma } from "../db/prisma.db";
import { UserColab, UserColabClientResponse } from "../types/types";
import bcrypt from 'bcryptjs'
import { getTimestampParsed } from "../helper/time.helper";


/**
 * Create a single Record <<UserColab>> (Only Super Admin)
 * @param {Pick<UserColab, "username" | "password" | "isSuperAdmin">} {Object} -->  Username must be unique
 * @returns {Promise<void>}
 */
export const createRecord = async ({username, password, isSuperAdmin}:Pick<UserColab, "username"| "password" | "isSuperAdmin">):Promise<void> => {
  
    const hashedPassword = bcrypt.hashSync(password, 10)
    await prisma.userColab.create({
        data:{
            username: username,
            password: hashedPassword,
            isSuperAdmin: isSuperAdmin
        }
    })

    return 
  
   
}

/**
 * Return all UserColab records (Only Super Admin)
 * @returns {Omit<UserColab, "password">, number} 
 */

export const readCountRecords = async():Promise<UserColabClientResponse> => {
   const [users, totalUsers] = await prisma.$transaction([
      prisma.userColab.findMany({omit:{ password:true },orderBy:{ createdAt:'desc' }}), // Password excluding from the response
      prisma.userColab.count()
   ])

   return {users, totalUsers}

}


/**
 * Get a single record  from Model UserColab (Only Super Admin)
 * @param {Pick<UserColab, "id">} id --> Current id fromr the current single record to return
 * @returns {Promise<Omit<UserColab, "password">|null>}
 */
export const readRecord = async({id}:Pick<UserColab,"id">):Promise<Omit<UserColab, "password">|null> => {
    const userColab = await prisma.userColab.findFirst({where:{id: id}, omit:{password:true}})

    return userColab
}


/**
 * Update single record (Only Super Admin)
 * @param {Pick<UserColab, "id" | "username" | "password" | "isSuperAdmin">} --> Current Id from the current record (That can't be updated), and all the rest of modifiable fields
 * @returns {Promise<void>}
 */
export const updateRecord  = async ({id,username, password, isSuperAdmin}:Pick<UserColab,"id" |"username"| "password" | "isSuperAdmin">):Promise<void> => {
    const hashedPassword = bcrypt.hashSync(password, 10)
    const timeStampUpdate = getTimestampParsed()
                await prisma.userColab.update({
                    where:{id: id},
                    data:{
                        username: username,
                        password: hashedPassword,
                        isSuperAdmin: isSuperAdmin, 
                        updatedAt: timeStampUpdate
                    }
                })

      return          
}


/**
 * Destroy a single record
 * @param {Pick<UserColab, "id">} id --> Current Id from the current record
 * @returns {Promise<void>}
 */
export const destroyRecord = async ({id}:Pick<UserColab,"id">):Promise<void> => {
    await prisma.userColab.delete({ where: {id: id} })
    return
}

/**
 * Only for Auth proposes
 * @param {string} id From the current decoding JWT
 * @returns {Pick<"isSuperAdmin"> | null} Return only the id & isSuperAdmin fields
 */
export const checkingRecord = async (id:string | undefined):Promise<Pick<UserColab, "isSuperAdmin" | "id"> | null> => {
    return await prisma.userColab.findUnique({
        where: { id: id },
        select: { id: true, isSuperAdmin: true } // Return only id & isSuperAdmin
      });
}


export const uniqueRecord = async ({username}:Pick<UserColab, "username">):Promise<Pick<UserColab, "id" | "username" | "password" |"isSuperAdmin"> | null> => {
    const user = await prisma.userColab.findUnique({where:{ username }, select:{ id: true, username: true, password:true , isSuperAdmin: true }})

    return user
}


export const updateTimeStampSignInRecord = async ({username}:Pick<UserColab, "username">):Promise<void> => {
    const lastSignIn = getTimestampParsed()
    await prisma.userColab.update({where:{username:username}, data:{ lastSignIn: lastSignIn }})
    return
}