// import { rateLimit } from "express-rate-limit";
// import { RedisStore } from "rate-limit-redis";
// import { redisClient } from "../db/redis.db";


// TODO: First, look up the documentation: https://express-rate-limit.mintlify.app/overview


/*
export const loginAttemptsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand:  (...args: string[]) => redisClient.call(...args),
  })
})*/



