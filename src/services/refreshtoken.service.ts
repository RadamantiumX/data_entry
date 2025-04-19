import { RefreshTokenQuerys } from "../dal/prisma_querys/refreshtoken.querys";
import { JWTBlacklist, JWTverifyAndDecode } from "../helper/jwt.helper";
import { PayloadRefreshToken } from "../types/types";
import { validateRefreshToken } from "../schemas/refreshtoken.validation";


// All PRISMA ERRORS can be handle on GLOBAL ERRORS
// TODO: Realizar una validacion para comprobar el token, y en caso que no sea valido, borrar la cookie existente.
export class RerfreshTokenService {
   static async createRefreshToken(payload:PayloadRefreshToken):Promise<void>{
       await validateRefreshToken(payload)
       await RefreshTokenQuerys.createRecord(payload)
       return
   } 

   static async blackListVerify(cookieReq:string){
       // const { exp } = JWTverifyAndDecode(cookieReq) // Token expiration KEY
        const { isValid } = JWTBlacklist(cookieReq)
        return { isValid }
   }
   
   static async verifyOwner(cookieReq:string){
       const {id} = JWTverifyAndDecode(cookieReq)
       const foundToken = await RefreshTokenQuerys.checkingRecord(id, cookieReq)
       return foundToken
   }
}