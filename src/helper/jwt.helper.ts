import type { IPayload, JWTOptions, JWTSign } from "../types/types"
import jwt from '../utils/jwt.methods'
import { getTimestampParsed } from "./time.helper"

// See the next tutorial for refresh tokens settings: https://dev.to/jeanvittory/jwt-refresh-tokens-2g3d
export const JWTverifyAndDecode = (authHeader:string): IPayload => {
    const token:string = authHeader?.split(' ')[1]
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