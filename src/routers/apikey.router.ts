import { Router } from 'express'
import { ApiKeyController } from '../controllers/apikey.controller'

const apikeyRouter = Router()
const apikeyController = new ApiKeyController()

apikeyRouter.post('/save', apikeyController.saveApiKey)
apikeyRouter.get('/show', apikeyController.showApiKeys)
apikeyRouter.get('/show-single/:id', apikeyController.showSingleApiKey)
apikeyRouter.post('/update', apikeyController.updateApiKeys)
apikeyRouter.delete('/del', apikeyController.destroyApiKey)


export default apikeyRouter