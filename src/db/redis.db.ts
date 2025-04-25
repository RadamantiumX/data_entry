import { createClient } from "redis";
import 'dotenv/config'
import { REDIS_PSW } from "../constants/index.constants";


export const client = createClient({
    username: 'default',
    password: REDIS_PSW,
    socket: {
        host: 'redis-10474.crce181.sa-east-1-2.ec2.redns.redis-cloud.com',
        port: 10474
    }
})

client.on('error', err=> console.log('Redis Client Error', err))


await client.connect()



// TODO: See the next tutorial to hanlde JWT and try to invalidate them... https://dev.to/webjose/how-to-invalidate-jwt-tokens-without-collecting-tokens-47pk