import 'dotenv/config'

export const COOKIE_EXP:Date = new Date(Date.now() + 24 * 60 * 60 * 1000)
export const A_TOKEN_TIME:string = process.env.ACCESS_TOKEN_EXPIRATION_TIME || '10s'
export const R_TOKEN_TIME:string = process.env.REFRESH_TOKEN_EXPIRATION_TIME || '1h'

export const UNIX_TIME_EXPIRATION = new Date().getTime() / 1000 // Today NOW TIMESTAMPS --> Equals with the value of REFRESH TOKEN EXPIRATION 