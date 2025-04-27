import { RateLimiterRule } from "../types/types"
import { Request, Response, NextFunction } from "express"
import { redisClient } from "../db/redis.db"
import { StatusCodes } from "http-status-codes"



export const rateLimiter = (rule:RateLimiterRule) => {
    const { endpoint, rateLimit } = rule

    return async (req:Request, res:Response, next:NextFunction) => {
        const ipAddress = req.ip
        const redisId = `${endpoint}/${ipAddress}`
        try{
            const requests = await redisClient.incr(redisId)

            if(requests === 1){
                await redisClient.expire(redisId, rateLimit.time)
            }

            if(requests > rateLimit.limit){
                res.status(StatusCodes.TOO_MANY_REQUESTS).json({message: 'Request limit exceded'})
                return
            }
         next()
        }catch(error){
            next(error)
        }
    }
}