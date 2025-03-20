import { JwtPayload } from "jsonwebtoken"
import { IPayload } from "../types/types"
import jwt from '../key/jwt.key'

export const JWTverifyAndDecode = (authHeader:string): IPayload => {
    const token:string = authHeader?.split(' ')[1]
       // Verify the token
       const decode:IPayload | any = jwt.verify(token)

      return {id: decode.id,  username: decode.username, currentDate: decode.currentDate, isSuperAdmin: decode.isSuperAdmin }
}

export const JWTtokenSign = ({id, username, currentDate, isSuperAdmin}:IPayload):string => {
   const token = jwt.sign({id, username, currentDate, isSuperAdmin})
   return token
}