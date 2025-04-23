import { validateAccessToken } from "../schemas/accesstoken.validation"
import { JWTverifyAndDecode } from "../helper/jwt.helper"
import { AuthQuerys } from "../dal/prisma_querys/auth.querys"
import { UserColab } from "../types/types"


// Errors can handle on validations
export class AccessTokenService{
    static async checkOwnerCredentials(authToken:string | any):Promise<Pick<UserColab, "isSuperAdmin" | "id"> | null>{
          await validateAccessToken({refreshToken: authToken})
          const {id} = JWTverifyAndDecode(authToken?.split(' ')[1])
          const userColab = await AuthQuerys.checkingRecord({id})
          return userColab
      }
}