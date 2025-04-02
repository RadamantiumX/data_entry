import { AuthQuerys } from "../dal/prisma_querys/auth.querys";
import bcrypt from 'bcryptjs'
import { JWTtokenSign, JWTverifyAndDecode } from "../helper/jwt.helper";
import type { UserColabService, UserColab } from "../types/types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AppError } from "../manage_exceptions/custom.error";

// ❗ Errors on validations can handle on "schemas"
// TODO: Improve the ERROR THROW on Prisma Client
// The ERROR's can handle on Prisma Exceptions
export class AuthService{
  /**
   * Service for handle the User Authentication Sigin
   * Combine the conditionals:
   * - User exists: Verify if the user exists on the Database
   * - Comparing provided password and current exists user on db
   * @param bodyReq 
   * @returns {Promise<UserColabService>} Returns a object with the Auth data, include the Jason Web Token
   */
   static async authUserColab(bodyReq:Pick<UserColab, "username" | "password">):Promise<UserColabService>{

      if(!bodyReq.username || !bodyReq.password){
       throw new AppError("Missing data request", 400, "Username and password are required", false)
      }
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
  
   /**
    * Service for cheking the token, decode and verify if is expired or invalid
    * @param authHeader 
    * @returns {Promise<Pick<UserColab, "isSuperAdmin" | "id"> | null>} Return a object with the current user "id", and if is a "super-admin"
    */
   static async authCredentialsVerify(authHeader:string):Promise<Pick<UserColab, "isSuperAdmin" | "id"> | null> {
    const {id} = JWTverifyAndDecode(authHeader)
    const checkId = AuthQuerys.checkingRecord({id})
    if(!checkId){
      throw new PrismaClientKnownRequestError('Here is an Error',{code:'P2002',clientVersion:''})
    }

    return checkId
   }
}