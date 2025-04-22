import { prisma } from "../../db/prisma.db";
import { AuthRefreshToken, PayloadRefreshToken } from "../../types/types";

export class RefreshTokenQuerys{
    
    static async createNewRecord(payload:PayloadRefreshToken):Promise<void>{
          await prisma.authRefreshToken.create({
            data:{
                refreshToken:[payload.refreshToken],
                userColabId: payload.userColabId
            }
          })
          return
    }
     
    static async checkUserColab(userColbaId:string):Promise<Pick<AuthRefreshToken, "id"> | null>{
        const userColabRecord = await prisma.authRefreshToken.findUnique({where:{ userColabId: userColbaId }, select: { id: true }})
        return userColabRecord
    }

    // TODO: Fix the return, can't be the same "userColabId"
    static async checkingRecord(userId:string,refToken:string):Promise<Pick<AuthRefreshToken, 'userColabId'> | null>{
        const checkToken = await prisma.authRefreshToken.findUnique({where:{userColabId: userId , refreshToken: {hasEvery: [refToken]}}, select:{userColabId:true}})
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

    static async clearTokenValue(refToken:string, userColabId:string):Promise<void>{
        const uniqueRecord = await prisma.authRefreshToken.findUnique({ 
        where: {
           userColabId: userColabId
        },
        select: {
            refreshToken: true
        }
    })
     const arrayUpdated = uniqueRecord?.refreshToken.filter(refreshToken => refreshToken !== refToken)

     await prisma.authRefreshToken.update({
        where: {userColabId: userColabId},
        data:{
            refreshToken: arrayUpdated !== null ? arrayUpdated : []
        }
     })
     return
    }
}