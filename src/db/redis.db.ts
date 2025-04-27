// import { createClient, RedisClientType } from "redis";
import 'dotenv/config'
import { REDIS_PSW } from "../constants/index.constants";
import Redis from "ioredis";




export const redisClient = new Redis({
    host: 'redis-10474.crce181.sa-east-1-2.ec2.redns.redis-cloud.com',
    port: 10474,
    password: REDIS_PSW
})




    /*

      const  client = createClient({
        username: 'default',
        password: REDIS_PSW,
        socket: {
            host: 'redis-10474.crce181.sa-east-1-2.ec2.redns.redis-cloud.com',
            port: 10474
        }
    })

    export const redisClient = async () => {
    // redisClient.on('error', err=> console.log('Redis Client Error', err))
    await client.connect()
    
    return client
   };

*/





// TODO: See the next tutorial to hanlde JWT and try to invalidate them... https://dev.to/webjose/how-to-invalidate-jwt-tokens-without-collecting-tokens-47pk