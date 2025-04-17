import { RefreshTokenQuerys } from "../dal/prisma_querys/refreshtoken.querys";
import { JWTverifyAndDecode } from "../helper/jwt.helper";
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
        
   }
   
   static async verifyAndRefresh(cookieReq:string){
       const decodedToken = JWTverifyAndDecode(cookieReq)
       const foundToken = await RefreshTokenQuerys.checkingRecord(decodedToken.id, cookieReq)
       return foundToken
   }
}