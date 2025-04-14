import { Router } from 'express'
import { RefreshTokenController } from '../controllers/refreshtoken.controller'

const refreshTokenRouter = Router()
const refreshTokenController = new RefreshTokenController()

refreshTokenRouter.post('/refresh-token', refreshTokenController.handleRefreshToken)

export default refreshTokenRouter