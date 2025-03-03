import { Router } from 'express'
import { DatumController } from '../controllers/datum.controller'

const datumRouter = Router()
const datumController = new DatumController()

datumRouter.post('/save', datumController.saveDatum)


export default datumRouter