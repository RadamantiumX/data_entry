import { IPayload, JWTOptions } from "../types/types"
import jwt from '../utils/jwt.methods'
import { getTimestampParsed } from "./time.helper"


export const JWTverifyAndDecode = (authHeader:string): IPayload => {
    const token:string = authHeader?.split(' ')[1]
       // Verify the token
       const decode:IPayload | any = jwt.verify(token)

      return {id: decode.id,  username: decode.username, currentDate: decode.currentDate, isSuperAdmin: decode.isSuperAdmin }
}

type JWTSign = {
  id: string ;
  username: string ;
  isSuperAdmin: boolean ;
  expiresIn: Pick<JWTOptions, "expiresIn"> | any | undefined;
}

export const JWTtokenSign = ({id, username, isSuperAdmin, expiresIn}:JWTSign):string => {
   const currentDate = getTimestampParsed().toString()
   const JWTOptions:JWTOptions = {expiresIn:expiresIn, algorithm:"HS256" }
   const token = jwt.sign({id, username, currentDate, isSuperAdmin}, JWTOptions)
   return token
}