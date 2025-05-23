import type { HttpCode } from '../types/error'
import { loggerTask } from '../task/logger.task'

// Error MIDDLEWARE
export class AppError extends Error {
  /***
   * @name -- name of ERROR
   * @httpCode -- code of http error
   * @isOperational --  Operational ERROR to handle
   */
  public readonly name: string
  public readonly httpCode: HttpCode
  public readonly isOperational: boolean

  constructor(
    name: string,
    httpCode: HttpCode,
    description: string,
    isOperational: boolean
  ) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    this.httpCode = httpCode
    this.isOperational = isOperational
    loggerTask(`${this.name}: ${description}`, 'errorLog.txt')
    Error.captureStackTrace(this)
  }
}
