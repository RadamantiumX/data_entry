import { Router } from 'express'
import { UserColabController } from '../controllers/usercolab.controller'

const usercolabRouter = Router()

usercolabRouter.post('/create', UserColabController.createUserColab)
usercolabRouter.get('/show-all', UserColabController.getAllUserColab)
usercolabRouter.get('/show/:id', UserColabController.getUserColab)
usercolabRouter.post('/update', UserColabController.updateUserColab)
usercolabRouter.delete('/del', UserColabController.destroyUserColab)

export default usercolabRouter