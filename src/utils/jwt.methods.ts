import 'dotenv/config'
import jwt from 'jsonwebtoken'
import type { IPayload } from '../types/types'

// TODO: Use the callback for generate a two separates TOKENS, ACCESS_TOKEN & REFRESH_TOKEN
// Adapt the provided projecto to replicate the funtioanality

export const SECRET_KEY:Readonly<string> = process.env.JWT_64 || 'secret'
/**
 * JWT methods
 */
export default {
    sign: (payload: IPayload) => 
        jwt.sign(payload, SECRET_KEY, {expiresIn: '7d', algorithm: 'HS256'}),

    verify: (token: string) => jwt.verify(token, SECRET_KEY)
}