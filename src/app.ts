import express from 'express'
// Routes
import authRouter from './routers/auth.router'
import datumRouter from './routers/datum.router'
import apidataRouter from './routers/apidata.router'
import apikeyRouter from './routers/apikey.router'
import usercolabRouter from './routers/usercolab.router'
import refreshTokenRouter from './routers/refreshtoken.router'

// Dependencies
import 'dotenv/config'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

// Middlewares
import { blackListJWT } from './middlewares/blacklistjwt.middleware'
import { verifyJWT } from './middlewares/verifyjwt.middleware'
// import { actManagement } from './middlewares/actmanagement.middleware'
import { errorHandler } from './manage_exceptions/global.error'
import { AppError } from './manage_exceptions/custom.error'
import { rateLimiter } from './middlewares/ratelimiter.middleware'

// Config
import { corsOptions } from './config/cors.config'

// Const
import { AUTH_RATE_LIMIT_RULE } from './constants/index.constants'


dotenv.config()
/**
 * Main APP MIDDLEWARES
 * 
 */
export const mainApp = () => {
    const app = express()
    const PORT = process.env.PORT || 3000
    app.use(cors(corsOptions))
    app.use(bodyParser.urlencoded({ extended: true  }))
    app.use(bodyParser.json())
    app.use(cookieParser())
    
    
    app.get("/", (req, res, next)=>{
        res.status(200).json({message: 'server on'})
        next() 
    })
   
    // Routes Middlewares
    app.use("/auth", rateLimiter(AUTH_RATE_LIMIT_RULE) ,authRouter) // Adding the Rate Limit into authentication

    app.use(blackListJWT)

    app.use(verifyJWT)
    app.use("/datum", datumRouter)
    app.use("/apidata", apidataRouter)
    app.use("/apikey", apikeyRouter)
    app.use("/refresh-token", refreshTokenRouter)
    
    // app.use(actManagement)
    app.use("/user", usercolabRouter)
    

    // Custom ERROR HANDLE
    app.all('*',(req, res, next)=>{
        const error = new AppError('Resource not found', 404, 'Due to the mismatch between the client defnied user and existing users in the database...',false)
        next(error)
    })
    // Hanlde Promise Rejections
    process.on("unhandledRejection", (reason)=>{
        console.error("Unhandled Promise Rejection:", reason)
    })
    // Handle Uncaught exceptions
    process.on("uncaughtException", (error)=>{
        console.error("Uncaught Exceptions:", error)
        process.exit(1) // App restart
    })

    // Error Middleware
    app.use(errorHandler)

    app.listen(PORT, ()=>{
        console.log(`Server is online: http://localhost:${PORT}`)
    })
}

