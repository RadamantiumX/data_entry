import 'dotenv/config'
import { RateLimiterRule } from '../types/types'


export const REDIS_PSW:Readonly<string> = process.env.REDIS_PASSWORD ?? ''
export const REDIS_PORT:Readonly<string | number> = 10474

export const COOKIE_EXP:Date = new Date(Date.now() + 24 * 60 * 60 * 1000)
export const A_TOKEN_TIME:string = process.env.ACCESS_TOKEN_EXPIRATION_TIME ?? '60s'
export const R_TOKEN_TIME:string = process.env.REFRESH_TOKEN_EXPIRATION_TIME ?? '1h'

export const UNIX_CURRENT_TIME = Math.floor(Date.now() / 1000) // Today NOW TIMESTAMPS --> Equals with the value of REFRESH TOKEN EXPIRATION 
export const TOKEN_LIFETIME = 60 * 60 // 1 hour in seconds

export const AUTH_RATE_LIMIT_RULE:RateLimiterRule = {
    endpoint: 'auth',
    rateLimit:{
        time: 60,
        limit: 3
    }
}

export const ALLOWED_ORGINS = [
    "http://localhost:2000",
    "http://localhost:4000",
    "http://localhost:5000",
    "http://localhost:80"
]

export const EXPIRED_MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk3ZjA1MTM4LTg4MmQtNDdlOC1iNWQxLTVkZThhZjA0NjcxNCIsInVzZXJuYW1lIjoiZmluZGVyLWNsb3VkIiwiY3VycmVudERhdGUiOiJNb24gQXByIDIxIDIwMjUgMjE6MTM6NDQgR01ULTAzMDAgKGhvcmEgZXN0w6FuZGFyIGRlIEFyZ2VudGluYSkiLCJpc1N1cGVyQWRtaW4iOnRydWUsImlhdCI6MTc0NTI4MDgyNCwiZXhwIjoxNzQ1Mjg0NDI0fQ._dgSpzwHItTxagoThRdShXN6LfZWVqD9LeYCm6WGFc0'