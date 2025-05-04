import { Router } from 'express'
import { ApiKeyController } from '../controllers/apikey.controller'

const apikeyRouter = Router()

apikeyRouter.post('/save', ApiKeyController.saveApiKey)
apikeyRouter.get('/show', ApiKeyController.showApiKeys)
apikeyRouter.get('/show-single/:id', ApiKeyController.showSingleApiKey)
apikeyRouter.post('/update', ApiKeyController.updateApiKeys)
apikeyRouter.delete('/del', ApiKeyController.destroyApiKey)

export default apikeyRouter
