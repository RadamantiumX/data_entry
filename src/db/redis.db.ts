import { createClient } from "redis";
import 'dotenv/config'

const REDIS_PSW:Readonly<string> = process.env.REDIS_PASSWORD || ''

export const redis = createClient({
    username: 'default',
    password: REDIS_PSW,
    socket: {
        host: 'redis-17262.c278.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 17262
    }
})

redis.on('error', err=> console.log('Redis Client Error', err))

await redis.connect()

// TODO: See the next tutorial to hanlde JWT and try to invalidate them...