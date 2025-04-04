import { IPayload } from "../types/types"
import jwt from '../utils/jwt.methods'
import { getTimestampParsed } from "./time.helper"

export const JWTverifyAndDecode = (authHeader:string): IPayload => {
    const token:string = authHeader?.split(' ')[1]
       // Verify the token
       const decode:IPayload | any = jwt.verify(token)

      return {id: decode.id,  username: decode.username, currentDate: decode.currentDate, isSuperAdmin: decode.isSuperAdmin }
}

export const JWTtokenSign = ({id, username, isSuperAdmin}:Pick<IPayload, "id" | "username" | "isSuperAdmin">):string => {
   const currentDate = getTimestampParsed().toString()
   const token = jwt.sign({id, username, currentDate, isSuperAdmin})
   return token
}