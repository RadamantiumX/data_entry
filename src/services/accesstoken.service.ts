import { validateAccessToken } from "../schemas/accesstoken.validation"
import { JWTverifyAndDecode } from "../helper/jwt.helper"
import { AuthQuerys } from "../dal/prisma_querys/auth.querys"
import { UserColab } from "../types/types"

export class AccessTokenService{
    static async checkOwnerCredentials(authToken:string | any):Promise<Pick<UserColab, "isSuperAdmin" | "id"> | null>{
          await validateAccessToken(authToken)
          const decodedInfo:any = JWTverifyAndDecode(authToken?.split(' ')[1])
          const userColab = await AuthQuerys.checkingRecord(decodedInfo.id)
          return userColab
      }
}