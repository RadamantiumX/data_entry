import express, {json} from 'express'
import authRouter from './routers/auth.router'
import testRouter from './routers/test.router'
import 'dotenv/config'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

dotenv.config()

export const mainApp = () => {
    const app = express()
    const PORT = process.env.PORT || 3000
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true  }))
    app.use(bodyParser.json())

    app.get("/", (req, res)=>{
        res.status(200).json({message: 'server on'})
    })
    app.use("/auth", authRouter)
    app.use("/datum", authRouter)
    app.use("/test", testRouter)

    app.listen(PORT, ()=>{
        console.log(`Server is online: http://localhost:${PORT}`)
    })
}