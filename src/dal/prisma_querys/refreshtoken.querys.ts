import { prisma } from "../../db/prisma.db";
import { AuthRefreshToken } from "../../types/types";

export class RefreshTokenQuerys{
    async checkingRecord(userId:string,refToken:string):Promise<Pick<AuthRefreshToken, 'id'> | null>{
        const checkToken = await prisma.authRefreshToken.findUnique({where:{userColabId: userId , refreshToken: refToken}, select:{id:true}})
        return checkToken
    }
}