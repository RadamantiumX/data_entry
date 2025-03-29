import { UserColabQuerys } from "../dal/prisma_querys/usercolab.querys";
import bcrypt from 'bcryptjs'
import { JWTtokenSign } from "../helper/jwt.helper";

export class AuthService{
   static async authUserColab(bodyReq){
      const uniqueUser = await UserColabQuerys.uniqueRecord(bodyReq.username)
      if(!uniqueUser){
        throw new Error()
      }
      const isValidPsw = await bcrypt.compare(bodyReq.password, uniqueUser.password)
      if(!isValidPsw){
        throw new Error()
      }
      await UserColabQuerys.updateTimeStampSignInRecord({username: uniqueUser.username})
      const token = JWTtokenSign({id: uniqueUser.id, username: uniqueUser.username, isSuperAdmin: uniqueUser.isSuperAdmin})

      return { id:uniqueUser.id, username: uniqueUser.username, superAdmin: uniqueUser.isSuperAdmin , token: token }
   }
}