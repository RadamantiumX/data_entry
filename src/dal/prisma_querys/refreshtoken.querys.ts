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
    
    static async checkingRecord(userId:string,refToken:string):Promise<Pick<AuthRefreshToken, 'userColabId'> | null>{
        const checkToken = await prisma.authRefreshToken.findFirst({where:{userColabId: userId , refreshToken: {hasEvery: [refToken]}}, select:{userColabId:true}})
        return checkToken
    }

    static async pushValueOnArrayRecord(userId:string,refToken:string):Promise<void>{
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

        return
    }

    static async clearArrayRecord(decodedUserId:string):Promise<void>{
        await prisma.authRefreshToken.update({
            where: {
                userColabId: decodedUserId
            },
            data:{
                refreshToken:{
                    set: [] // Turn to empty array
                }
            }
        })
        return 
    }
}