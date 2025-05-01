import { RefreshTokenQuerys } from "../dal/prisma_querys/refreshtoken.querys";
import { JWTBlacklist, JWTtokenSign, JWTverifyAndDecode } from "../helper/jwt.helper";
import { PayloadRefreshToken } from "../types/types";
import { validateRefreshToken } from "../schemas/refreshtoken.validation";
import { A_TOKEN_TIME } from '../constants/index.constants';

// All PRISMA ERRORS can be handle on GLOBAL ERRORS
// TODO: Realizar una validacion para comprobar el token, y en caso que no sea valido, borrar la cookie existente.
export class RerfreshTokenService {
   static async createRefreshToken(payload:PayloadRefreshToken):Promise<void>{
       await validateRefreshToken(payload)
       await RefreshTokenQuerys.createNewRecord(payload)
       return
   } 

   static async blackListVerify(cookieReq:string):Promise<{isValid:boolean}>{
       // const { exp } = JWTverifyAndDecode(cookieReq) // Token expiration KEY
        const { isValid } = JWTBlacklist(cookieReq)
        return { isValid }
   }
   
   static async verifyOwner(cookieReq:string){
       const {id} = JWTverifyAndDecode(cookieReq)
       const foundToken = await RefreshTokenQuerys.checkingRecord(id, cookieReq)
       return foundToken
   }

   static async signAccessToken(cookieReq:string){
      const {id, username, isSuperAdmin} = JWTverifyAndDecode(cookieReq)
      const newAccessToken = JWTtokenSign({id, username, isSuperAdmin, expiresIn:A_TOKEN_TIME})
      return newAccessToken
   }

   static async destroyReused(cookieReq:string):Promise<void>{
    const {id} = JWTverifyAndDecode(cookieReq)
    await RefreshTokenQuerys.clearTokenValue(cookieReq, id)
    return
   }
}