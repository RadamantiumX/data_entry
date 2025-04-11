import { RefreshTokenQuerys } from "../dal/prisma_querys/refreshtoken.querys";
import { JWTverifyAndDecode } from "../helper/jwt.helper";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";


// TODO: Realizar una validacion para comprobar el token, y en caso que no sea valido, borrar la cookie existente.
export class RerfreshTokenService {
   static async createRefreshToken(){

   } 
   
   static async verifyOwner(cookieReq:string){
       const decodedToken = JWTverifyAndDecode(cookieReq)
       const foundToken = await RefreshTokenQuerys.checkingRecord(decodedToken.id, cookieReq)
       return foundToken
   }
}