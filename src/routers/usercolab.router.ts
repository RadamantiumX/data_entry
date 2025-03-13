import { Router } from 'express'
import { UserColabController } from '../controllers/usercolab.controller'

const usercolabRouter = Router()
const usercolabController = new UserColabController()

usercolabRouter.post('/create', usercolabController.createUserColab)
usercolabRouter.get('/show', usercolabController.showUserColab)
usercolabRouter.post('/update', usercolabController.updateUserColab)
usercolabRouter.delete('/del', usercolabController.destroyUserColab)

export default usercolabRouter