import { Router } from 'express'
import { DatumController } from '../controllers/datum.controller'

const datumRouter = Router()

datumRouter.post('/save', DatumController.saveDatum)
datumRouter.get('/show', DatumController.showDatum)
datumRouter.get('/select-email/:email', DatumController.selectForEmail)
datumRouter.get('/select-all-related', DatumController.selectAllRelated)
datumRouter.delete('/del', DatumController.destroyDatum)


export default datumRouter