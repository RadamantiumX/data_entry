import express, {json} from 'express'
import authRouter from './routers/auth.router'
import datumRouter from './routers/datum.router'
import apidataRouter from './routers/apidata.router'
import apikeyRouter from './routers/apikey.router'
import usercolabRouter from './routers/usercolab.router'
import testRouter from './routers/test.router'
import 'dotenv/config'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { authCredentials } from './middlewares/authcredentials.middleware'
import { actManagement } from './middlewares/actmanagement.middleware'
import { errorHandler } from './errors/global.error'

dotenv.config()
/**
 * Main APP with express methods
 */
export const mainApp = () => {
    const app = express()
    const PORT = process.env.PORT || 3000
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true  }))
    app.use(bodyParser.json())
    app.use(errorHandler)

    app.get("/", (req, res)=>{
        res.status(200).json({message: 'server on'})
    })
    app.use("/auth", authRouter)
    app.use("/datum", authCredentials, datumRouter)
    app.use("/apidata", authCredentials, apidataRouter)
    app.use("/apikey",authCredentials, apikeyRouter)
    app.use("/user", usercolabRouter)
    app.use("/test",actManagement,testRouter)

    // Hanlde Promise Rejections
    process.on("unhandledRejection", (reason)=>{
        console.error("Unhandled Promise Rejection:", reason)
    })
    // Handle Uncaught exceptions
    process.on("uncaughtException", (error)=>{
        console.error("Uncaught Exceptions:", error)
        process.exit(1) // App restart
    })

    app.listen(PORT, ()=>{
        console.log(`Server is online: http://localhost:${PORT}`)
    })
}

