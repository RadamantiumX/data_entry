import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller'

const authRouter = Router()
const authController = new AuthController()

authRouter.post('/signin', authController.signin)
authRouter.post('/create', authController.generateColab)


export default authRouter