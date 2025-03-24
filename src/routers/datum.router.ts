import { Router } from 'express'
import { DatumController } from '../controllers/datum.controller'

const datumRouter = Router()
const datumController = new DatumController()

datumRouter.post('/save', datumController.saveDatum)
datumRouter.get('/show', datumController.showDatum)
datumRouter.get('/select-email/:email', datumController.selectForEmail)
datumRouter.get('/select-all-related', datumController.selectAllRelated)
datumRouter.delete('/del', datumController.destroyDatum)


export default datumRouter