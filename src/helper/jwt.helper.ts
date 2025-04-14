import type { IPayload, JWTOptions, JWTSign, DecodedStringToken, DecodedTokenKeys } from "../types/types"
import { UNIX_TIME_EXPIRATION } from "../constants/index.constants"
import jwt from '../utils/jwt.methods'
import { getTimestampParsed } from "./time.helper"
import 'dotenv/config'

const A_TOKEN_TIME:any = process.env.ACCESS_TOKEN_EXPIRATION_TIME


// All JWT ERRORS can be handle on GLOBAL ERRORS

// See the next tutorial for refresh tokens settings: https://dev.to/jeanvittory/jwt-refresh-tokens-2g3d
export const JWTverifyAndDecode = (token:string): IPayload  => {
       // Verify the token
      const decodedToken:IPayload | any = jwt.verify(token)
      return {id: decodedToken.id,  username: decodedToken.username, currentDate: decodedToken.currentDate, isSuperAdmin: decodedToken.isSuperAdmin }
}

export const JWTtokenSign = ({id, username, isSuperAdmin, expiresIn}:JWTSign):string => {
   const currentDate = getTimestampParsed().toString()
   const JWTOptions:JWTOptions = {expiresIn:expiresIn, algorithm:"HS256" }
   const token = jwt.sign({id, username, currentDate, isSuperAdmin}, JWTOptions)
   return token
}




export const JWTRefreshBlacklist = (refreshTokenCookie:string):boolean => {
  
   let valid:boolean
   // Verify the refresh token
   const decodedRefreshToken:DecodedTokenKeys | DecodedStringToken | any = jwt.verify(refreshTokenCookie)

   if(!decodedRefreshToken){
      return valid = false
   }

   // Take the Unix Timestamp from the Payload Token, and compare with Today now Date
   if(decodedRefreshToken.exp > Math.trunc(UNIX_TIME_EXPIRATION)){
      return valid = false
   }
   const JWTOptions:JWTOptions = {expiresIn:A_TOKEN_TIME, algorithm:"HS256" }
   // const newAccessToken = jwt.sign({id:decodedToken.id, username: decodedToken.username, currentDate: getTimestampParsed().toString(), isSuperAdmin: decodedToken.isSuperAdmin}, JWTOptions)

   return valid = true
}