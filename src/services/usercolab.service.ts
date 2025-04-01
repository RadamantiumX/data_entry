import { UserColabQuerys } from "../dal/prisma_querys/usercolab.querys"
import { UserColab, UserColabClientResponse } from "../types/types"
import { validateUser } from "../schemas/usercolab.validation"


// ❗ Errors on validations can handle on "schemas"

export class UserColabService {
   /**
    * Service for create a new UserColab, only "super-admin" allowed 
    * @param {Pick<UserColab, "username"| "password" | "isSuperAdmin">} bodyReq 
    * @returns {Promise<void>}
    */
    static async createUserColab(bodyReq:Pick<UserColab, "username"| "password" | "isSuperAdmin">):Promise<void> {
    await validateUser(bodyReq)
    await UserColabQuerys.createRecord(bodyReq)
    return
   }
   
  /**
   * Service for get all UserColab records, only "super-admin" allowed
   * @returns {Promise<UserColabClientResponse>} return an ARRAY with all UserColab rows on DB, only selected fields
   */
   static async getAllUserColab():Promise<UserColabClientResponse>{
       const allUserColab = await UserColabQuerys.readCountRecords()
       return allUserColab
   }

   /**
    * Service for get a UserColab single record, the "id" is required, only "super-admin" allowed
    * @param {Pick<UserColab, "id">} paramReq 
    * @returns {Promise<Omit<UserColab, "password"> | null>} return an object with UserColab data, only selected fields
    */
   static async getUserColab(paramReq:Pick<UserColab, "id">):Promise<Omit<UserColab, "password"> | null>{
    const userColab = await UserColabQuerys.readRecord(paramReq)
    return userColab
   }
  
   /**
    * Service for update and UserColab record, only "super-admin" allowed
    * @param {Pick<UserColab, "id" | "username" | "password" | "isSuperAdmin">} bodyReq 
    * @returns {Promise<void>}
    */
   static async updateUserColab(bodyReq:Pick<UserColab, "id" | "username" | "password" | "isSuperAdmin">):Promise<void>{
     await validateUser(bodyReq)
     await UserColabQuerys.updateRecord(bodyReq)
     return
   }
  
   /**
    * Delete a UserColab record, the "id" is required, only "super-admin" allowed
    * @param {Pick<UserColab, "id">} bodyReq 
    * @returns {Promise<void>}
    */
   static async destroyUserColab(bodyReq:Pick<UserColab, "id">):Promise<void>{
     await UserColabQuerys.destroyRecord(bodyReq)
     return
   }
}

