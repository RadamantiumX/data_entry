/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JWTOptions, JWTSign, DecodedStringToken, DecodedTokenKeys } from "../types/types"
import { UNIX_CURRENT_TIME, TOKEN_LIFETIME } from '../constants/index.constants';
import jwt from '../utils/jwt.methods'
import { getTimestampParsed } from "./time.helper"
import 'dotenv/config'


// All JWT ERRORS can be handle on GLOBAL ERRORS

// See the next tutorial for refresh tokens settings: https://dev.to/jeanvittory/jwt-refresh-tokens-2g3d
export const JWTverifyAndDecode = (token:string): DecodedTokenKeys  => {
       // Verify the token
      const decodedToken:any = jwt.verify(token)

      // Can TAKE any of this KEYS on this RESPONSE OBJECT
      return {id: decodedToken.id,  username: decodedToken.username, currentDate: decodedToken.currentDate, isSuperAdmin: decodedToken.isSuperAdmin, iat: decodedToken.iat, exp: decodedToken.exp }
}

export const JWTtokenSign = ({id, username, isSuperAdmin, expiresIn}:JWTSign):string => {
   const currentDate = getTimestampParsed().toString()
   const JWTOptions:JWTOptions = {expiresIn:expiresIn, algorithm:"HS256" }
   const token = jwt.sign({id, username, currentDate, isSuperAdmin}, JWTOptions)
   return token
}



// All tokens enter on the BL when the LIFE TIME is expired, after that the TOKEN must be deleted and unbinded from the current user
export const JWTBlacklist = (refreshTokenCookie:string):{isValid:boolean, userColabId:string} => {
  
   const decodedRefreshToken:DecodedTokenKeys | DecodedStringToken | any = jwt.verify(refreshTokenCookie)

   return { isValid: !(decodedRefreshToken.iat + TOKEN_LIFETIME < UNIX_CURRENT_TIME), userColabId: decodedRefreshToken.id }
}