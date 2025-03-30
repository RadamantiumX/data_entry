import { UserColabQuerys } from "../dal/prisma_querys/usercolab.querys"
import { UserColab } from "@prisma/client"
import { validateUser } from "../schemas/usercolab.validation"


// ❗ Errors on validations can handle on "schemas"

export class UserColabService {
    static async createUserColab(bodyReq:Pick<UserColab, "username"| "password" | "isSuperAdmin">):Promise<void> {
    await validateUser(bodyReq)
    await UserColabQuerys.createRecord(bodyReq)
    return
   }
   

   static async getAllUserColab(){
       const allUserColab = await UserColabQuerys.readCountRecords()
       return allUserColab
   }

   static async getUserColab(paramReq:Pick<UserColab, "id">){
    const userColab = await UserColabQuerys.readRecord(paramReq)
    return userColab
   }

   static async updateUserColab(bodyReq:Pick<UserColab, "id" | "username" | "password" | "isSuperAdmin">):Promise<void>{
     await validateUser(bodyReq)
     await UserColabQuerys.updateRecord(bodyReq)
     return
   }

   static async destroyUserColab(bodyReq:Pick<UserColab, "id">){
     await UserColabQuerys.destroyRecord(bodyReq)
     return
   }
}

