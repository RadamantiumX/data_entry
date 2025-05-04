import { Router } from 'express'
import { ApiDataController } from '../controllers/apidata.controller'

const apidataRouter = Router()

apidataRouter.post('/save', ApiDataController.saveApiData)
apidataRouter.get('/show', ApiDataController.showApiDatas)
apidataRouter.get('/show-single/:id', ApiDataController.showSingleApiData)
apidataRouter.delete('/del', ApiDataController.destroyApiData)

export default apidataRouter
