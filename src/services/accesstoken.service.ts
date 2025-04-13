import { validateAccessToken } from "../schemas/accesstoken.validation"
import { JWTverifyAndDecode } from "../helper/jwt.helper"
import { prisma } from "../db/prisma.db"

export class AccessTokenService{
    static async checkOwnerCredentials(authToken:string | any){
          await validateAccessToken(authToken)
          const decodedInfo = JWTverifyAndDecode(authToken?.split(' ')[1])
          const userColab = await prisma.userColab.findUnique({where:{ username: decodedInfo.username }, select: {id: true}})
          return userColab
      }
}