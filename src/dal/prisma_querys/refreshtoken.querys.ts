import { prisma } from "../../db/prisma.db";
import { AuthRefreshToken } from "../../types/types";

export class RefreshTokenQuerys{
    static async createRecord(payload:Pick<AuthRefreshToken, 'userColabId'|'refreshToken'>):Promise<void>{
          await prisma.authRefreshToken.create({
            data:{
                refreshToken: payload.refreshToken,
                userColabId: payload.userColabId
            }
          })
          return
    }
    
    static async checkingRecord(userId:string,refToken:string):Promise<Pick<AuthRefreshToken, 'id'> | null>{
        const checkToken = await prisma.authRefreshToken.findUnique({where:{userColabId: userId , refreshToken: refToken}, select:{id:true}})
        return checkToken
    }
}