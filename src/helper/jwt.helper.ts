import type { IPayload, JWTOptions, JWTSign, DecodedStringToken, DecodedTokenKeys } from "../types/types"
import jwt from '../utils/jwt.methods'
import { getTimestampParsed } from "./time.helper"
import { AppError } from "../manage_exceptions/custom.error"
import 'dotenv/config'

const A_TOKEN_TIME:any = process.env.ACCESS_TOKEN_EXPIRATION_TIME

// See the next tutorial for refresh tokens settings: https://dev.to/jeanvittory/jwt-refresh-tokens-2g3d
export const JWTverifyAndDecode = (authHeader:string): IPayload => {
    const token:string = authHeader?.split(' ')[1]
       // Verify the token
       const decodedToken:IPayload | any = jwt.verify(token)
       if(!decodedToken){
         throw new AppError('Not Valid Token', 403, 'Forbidden: The token provided is not valid for authenticate', false)
       }
      return {id: decodedToken.id,  username: decodedToken.username, currentDate: decodedToken.currentDate, isSuperAdmin: decodedToken.isSuperAdmin }
}

export const JWTtokenSign = ({id, username, isSuperAdmin, expiresIn}:JWTSign):string => {
   const currentDate = getTimestampParsed().toString()
   const JWTOptions:JWTOptions = {expiresIn:expiresIn, algorithm:"HS256" }
   const token = jwt.sign({id, username, currentDate, isSuperAdmin}, JWTOptions)
   return token
}


export const JWTValidationAndRefresh = (authHeader:string,refreshTOken:string) => {
   const token: string = authHeader?.split(' ')[1]
   
   // Verify the token
   const decodedToken:DecodedStringToken | DecodedTokenKeys | any = jwt.verify(token)

   // Verify the refresh token
   const decodedRefreshToken:DecodedTokenKeys | DecodedStringToken | any = jwt.verify(refreshTOken)

   if(!decodedToken && !decodedRefreshToken){
      throw new AppError('Not Valid Token', 403, 'Forbidden: The token provided is not valid for authenticate', false)
   }

   // Take the Unix Timestamp from the Payload Token, and compare with Today now Date
   if(decodedRefreshToken.exp <= Math.trunc(new Date().getTime() / 1000)){
      throw new AppError('Not Valid Token', 403, 'Forbidden: The token provided is not valid for authenticate', false)
   }
   const JWTOptions:JWTOptions = {expiresIn:A_TOKEN_TIME, algorithm:"HS256" }
   const newAccessToken = jwt.sign({id:decodedToken.id, username: decodedToken.username, currentDate: getTimestampParsed().toString(), isSuperAdmin: decodedToken.isSuperAdmin}, JWTOptions)

   return newAccessToken
}