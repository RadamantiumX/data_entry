import { AuthQuerys } from "../dal/prisma_querys/auth.querys";
import bcrypt from 'bcryptjs'
import { JWTtokenSign, JWTverifyAndDecode } from "../helper/jwt.helper";
import type { UserColabService, UserColab } from "../types/types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

// TODO: Improve the ERROR THROW on Prisma Client
export class AuthService{
   static async authUserColab(bodyReq:Pick<UserColab, "username" | "password">):Promise<UserColabService>{
      // Verify the unique user
      const username = bodyReq.username
      const uniqueUser:Pick<UserColab, "id" | "username" | "password" |"isSuperAdmin"> | null  = await AuthQuerys.uniqueRecord({username})
      if(!uniqueUser){
        throw new PrismaClientKnownRequestError('Here is an Error',{code:'P2002',clientVersion:''})
      }

      // Comparing passwords
      const isValidPsw = await bcrypt.compare(bodyReq.password, uniqueUser.password)
      if(!isValidPsw){
        throw new PrismaClientKnownRequestError('Here is an Error',{code:'P2002',clientVersion:''})
        
      }
      await AuthQuerys.updateTimeStampSignInRecord({username:uniqueUser.username})
      const token = JWTtokenSign({id: uniqueUser?.id, username: uniqueUser?.username, isSuperAdmin: uniqueUser?.isSuperAdmin})

      return { authData:{id:uniqueUser?.id, username: uniqueUser?.username, isSuperAdmin: uniqueUser?.isSuperAdmin} , token: token }
   }

   static async authCredentialsVerify(authHeader:string){
    const {id} = JWTverifyAndDecode(authHeader)
    const checkId = AuthQuerys.checkingRecord({id})
    if(!checkId){
      throw new PrismaClientKnownRequestError('Here is an Error',{code:'P2002',clientVersion:''})
    }

    return checkId
   }
}