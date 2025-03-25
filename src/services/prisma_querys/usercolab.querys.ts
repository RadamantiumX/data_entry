import { prisma } from "../../db/prisma.db";
import { UserColab, UserColabClientResponse } from "../../types/types";
import bcrypt from 'bcryptjs'
import { getTimestampParsed } from "../../helper/time.helper";


/**
 * Create a single Record <<UserColab>> (Only Super Admin)
 * @param {Pick<UserColab, "username" | "password" | "isSuperAdmin">} bodyRequest -->  Username must be unique
 * @returns {Promise<void>}
 */
export const createRecord = async (bodyRequest:Pick<UserColab, "username"| "password" | "isSuperAdmin">):Promise<void> => {
  
    const hashedPassword = bcrypt.hashSync(bodyRequest.password, 10)
    await prisma.userColab.create({
        data:{
            username: bodyRequest.username,
            password: hashedPassword,
            isSuperAdmin: bodyRequest.isSuperAdmin
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
 * @param {Pick<UserColab, "id">} bodyRequest --> Current id fromr the current single record to return
 * @returns {Promise<Omit<UserColab, "password">|null>}
 */
export const readRecord = async(bodyRequest:Pick<UserColab,"id">):Promise<Omit<UserColab, "password">|null> => {
    const userColab = await prisma.userColab.findFirst({where:{id: bodyRequest.id}, omit:{password:true}})

    return userColab
}


/**
 * Update single record (Only Super Admin)
 * @param {Pick<UserColab, "id" | "username" | "password" | "isSuperAdmin">} bodyRequest --> Current Id from the current record (That can't be updated), and all the rest of modifiable fields
 * @returns {Promise<void>}
 */
export const updateRecord  = async (bodyRequest:Pick<UserColab,"id" |"username"| "password" | "isSuperAdmin">):Promise<void> => {
                await prisma.userColab.update({
                    where:{id: bodyRequest.id},
                    data:{
                        username: bodyRequest.username,
                        password: bcrypt.hashSync(bodyRequest.password, 10),
                        isSuperAdmin: bodyRequest.isSuperAdmin, 
                        updatedAt: getTimestampParsed()
                    }
                })

      return          
}


/**
 * Destroy a single record
 * @param {Pick<UserColab, "id">} bodyRequest --> Current Id from the current record
 * @returns {Promise<void>}
 */
export const destroyRecord = async (bodyRequest:Pick<UserColab,"id">):Promise<void> => {
    await prisma.userColab.delete({ where: {id: bodyRequest.id} })
    return
}

/**
 * Only for Auth proposes
 * @param {string} bodyRequest From the current decoding JWT
 * @returns {Pick<"isSuperAdmin"> | null} Return only the id & isSuperAdmin fields
 */
export const checkingRecord = async (arg:Pick<UserColab, "id">):Promise<Pick<UserColab, "isSuperAdmin" | "id"> | null> => {
    return await prisma.userColab.findUnique({
        where: { id: arg.id },
        select: { id: true, isSuperAdmin: true } // Return only id & isSuperAdmin
      });
}

/**
 * A unique "username" record
 * @param {Pick<UserColab, "username">} bodyRequest username inside the body request from the client
 * @returns {Promise<Pick<UserColab, "id" | "username" | "password" |"isSuperAdmin"> | null>} Return a unique record with the UserColab and selected fields
 */
export const uniqueRecord = async (bodyRequest:Pick<UserColab, "username">):Promise<Pick<UserColab, "id" | "username" | "password" |"isSuperAdmin"> | null> => {
    const user = await prisma.userColab.findUnique({where:{ username: bodyRequest.username }, select:{ id: true, username: true, password:true , isSuperAdmin: true }})

    return user
}

/**
 * Update the timestamp with the last sing in of the user...
 *
 * @param {Pick<UserColab, "username">} username
 * @returns {Promise<void>}
 */
export const updateTimeStampSignInRecord = async ({username}:Pick<UserColab, "username">):Promise<void> => {
    const lastSignIn = getTimestampParsed()
    await prisma.userColab.update({where:{username:username}, data:{ lastSignIn: lastSignIn }})
    return
}