import { Router } from 'express'
import { TestController } from '../controllers/test.controller'

const testRouter = Router()
const datumController = new TestController()

testRouter.post('/asd', datumController.showTokenOnHeader)


export default testRouter