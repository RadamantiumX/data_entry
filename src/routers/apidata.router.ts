import { Router } from 'express'
import { ApiDataController } from '../controllers/apidata.controller'

const apidataRouter = Router()
const apiDataController = new ApiDataController()

apidataRouter.post('/save', apiDataController.saveApiData)
apidataRouter.get('/show', apiDataController.showApiData)
apidataRouter.delete('/del', apiDataController.destroyApiData)


export default apidataRouter