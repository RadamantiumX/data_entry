import { Router } from 'express'
import { RefreshTokenController } from '../controllers/refreshtoken.controller'

const refreshTokenRouter = Router()

refreshTokenRouter.post(
  '/refresh-token',
  RefreshTokenController.handleRefreshToken
)

export default refreshTokenRouter
