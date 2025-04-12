import z from 'zod'
import { AuthRefreshToken } from '../types/types'


const accessTokenSchema = z.object({
    refreshToken: z.string({
        required_error: 'This field is required'
    }).length(356).startsWith('Bearer ', {message: 'The provided credentials is invalid for authenticate'})
    
}).required()

export async function validateAccessToken(input:string) {
    const parseSync = await accessTokenSchema.safeParseAsync(input)
        if(!parseSync.success){
           throw parseSync.error
        }
        return parseSync
}