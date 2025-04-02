import 'dotenv/config'
import jwt from 'jsonwebtoken'
import type { IPayload } from '../types/types'

// TODO: Use the callback for generate a two separates TOKENS, ACCESS_TOKEN & REFRESH_TOKEN
// Adapt the provided projecto to replicate the funtioanality

const SECRET:Readonly<string> = process.env.JWT_64 || 'secret'
/**
 * JWT methods
 */
export default {
    sign: (payload: IPayload) => 
        jwt.sign(payload, SECRET, {expiresIn: '7d', algorithm: 'HS256'}),

    verify: (token: string) => jwt.verify(token, SECRET)
}