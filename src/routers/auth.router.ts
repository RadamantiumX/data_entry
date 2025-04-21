import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'

const authRouter = Router()


authRouter.post('/signin', AuthController.signin)
authRouter.post('/logout', AuthController.logout)

export default authRouter