import { Router } from 'express'
import { TestController } from '../controllers/test.controller'
import { checkRole } from '../middlewares/checkrole.middleware'

const testRouter = Router()
const testController = new TestController()

testRouter.post('/asd',testController.showTokenOnHeader)
testRouter.post('/bop', testController.testFunction)


export default testRouter