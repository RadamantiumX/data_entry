import { prisma } from "../../db/prisma.db";
import { AuthRefreshToken, PayloadRefreshToken } from "../../types/types";

export class RefreshTokenQuerys{
    static async createRecord(payload:PayloadRefreshToken):Promise<void>{
          await prisma.authRefreshToken.create({
            data:{
                refreshToken:[payload.refreshToken],
                userColabId: payload.userColabId
            }
          })
          return
    }
    
    static async checkingRecord(userId:string,refToken:string):Promise<Pick<AuthRefreshToken, 'id'> | null>{
        const checkToken = await prisma.authRefreshToken.findUnique({where:{userColabId: userId , refreshToken: {hasEvery: [refToken]}}, select:{id:true}})
        return checkToken
    }

    static async pushValueOnRecord(userId:string,refToken:string){
        await prisma.authRefreshToken.update({
            where:{
                userColabId: userId
            },
            data:{
                refreshToken: {
                    push: refToken
                }
            }
        })
    }
}