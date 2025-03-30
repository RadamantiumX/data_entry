import { UserColabQuerys } from "../dal/prisma_querys/usercolab.querys";
import bcrypt from 'bcryptjs'
import { JWTtokenSign, JWTverifyAndDecode } from "../helper/jwt.helper";
import type { UserColabService, UserColab } from "../types/types";

export class AuthService{
   static async authUserColab(bodyReq:Pick<UserColab, "username" | "password">):Promise<UserColabService>{
      // Verify the unique user
      const uniqueUser:Pick<UserColab, "id" | "username" | "password" |"isSuperAdmin"> | any = await UserColabQuerys.uniqueRecord(bodyReq.username)
      /*if(!uniqueUser){
        throw new Error('Invalid user account, unauthorized to pass through')
      }*/

      // Comparing passwords
      const isValidPsw = await bcrypt.compare(bodyReq.password, uniqueUser.password)
      if(!isValidPsw){
        throw new Error()
        
      }
      await UserColabQuerys.updateTimeStampSignInRecord({username: uniqueUser.username})
      const token = JWTtokenSign({id: uniqueUser.id, username: uniqueUser.username, isSuperAdmin: uniqueUser.isSuperAdmin})

      return { authData:{id:uniqueUser?.id, username: uniqueUser?.username, isSuperAdmin: uniqueUser?.isSuperAdmin} , token: token }
   }

   static async authCredentialsVerify(authHeader:string){
    const {id} = JWTverifyAndDecode(authHeader)
    const checkId = UserColabQuerys.checkingRecord({id})
    if(!checkId){
      throw new Error('Wrong provided credentials')
    }

    return checkId
   }
}