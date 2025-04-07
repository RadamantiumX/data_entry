import 'dotenv/config'
import jwt from 'jsonwebtoken'
import type { IPayload } from '../types/types'

// TODO: Use the callback for generate a two separates TOKENS, ACCESS_TOKEN & REFRESH_TOKEN
// TODO: Adapt the provided projecto to replicate the funtioanality
// TODO: Prevent the Brute Force Attack

export const SECRET_KEY:Readonly<string> = process.env.JWT_64 || 'secret'
/**
 * JWT methods
 */

// Only wuth the TYPE "jwt.SignOptions" can be assing to the JWT sign method
/*const JWTOptions:jwt.SignOptions = {
    expiresIn: '10s',
    algorithm: 'HS256'
}*/
export default {
    sign: (payload: IPayload, JWTOptions:jwt.SignOptions ) => 
        jwt.sign(payload, SECRET_KEY, JWTOptions),

        verify: (token: string) => jwt.verify(token, SECRET_KEY)
}