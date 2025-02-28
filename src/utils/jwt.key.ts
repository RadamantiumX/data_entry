import 'dotenv/config'
import jwt from 'jsonwebtoken'
import type { IPayload } from '../types/types'

const SECRET = process.env.JWT_SECRET || 'secret'

export default {
    sign: (payload: IPayload) => 
        jwt.sign(payload, SECRET, {expiresIn: '7d', algorithm: 'HS256'}),

    verify: (token: string) => jwt.verify(token, SECRET)
}