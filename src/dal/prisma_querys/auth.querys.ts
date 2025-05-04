import { UserColab } from "../../types/types";
import { prisma } from "../../db/prisma.db";
import { getTimestampParsed } from "../../helper/time.helper";

export class AuthQuerys{
    
    /**
     * Only for Auth proposes
     * @param {string} arg From the current decoding JWT
     * @returns {Pick<"isSuperAdmin"> | null} Return only the id & isSuperAdmin fields
     */
    static async checkingRecord(arg:Pick<UserColab, "id">):Promise<Pick<UserColab, "isSuperAdmin" | "id"> | null> {
        return await prisma.userColab.findUnique({
            where: { id: arg.id },
            select: { id: true, isSuperAdmin: true } // Return only id & isSuperAdmin
          });
    }
    
    /**
     * A unique "username" record
     * @param {Pick<UserColab, "username">} username username inside the body request from the client
     * @returns {Promise<Pick<UserColab, "id" | "username" | "password" |"isSuperAdmin"> | null>} Return a unique record with the UserColab and selected fields
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async uniqueRecord(username:Pick<UserColab, "username"> | string |  any):Promise<Pick<UserColab, "id" | "username" | "password" |"isSuperAdmin"> | null> {
        const user = await prisma.userColab.findUnique({where:{ username:username }, select:{ id: true, username: true, password:true , isSuperAdmin: true }})
    
        return user
    }
    
    /**
     * Update the timestamp with the last SIGN IN of the user...
     *
     * @param {Pick<UserColab, "username">} username
     * @returns {Promise<void>}
     */
    static async updateTimeStampSignInRecord(username:Pick<UserColab, "username">):Promise<void> {
        const lastSignIn = getTimestampParsed()
       
        await prisma.userColab.update({where:{username:username.username}, data:{ lastSignIn: lastSignIn }})
        return
    }
}