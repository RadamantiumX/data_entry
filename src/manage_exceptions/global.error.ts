/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import { Prisma } from '@prisma/client'
import { prismaError } from './prisma.errors'
import { SendingErrorPrisma } from '../types/error'
import { StatusCodes } from 'http-status-codes'
import z from 'zod'

/**
 * Catching the global Errors from all Middlewares
 * In this logic can found all throw errors
 * @param {any | PrismaErrorType} error --> Throw an Unexpected (or not) ERROR
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 *
 * @returns {void}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Prisma Exceptions
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaErrorResponse: SendingErrorPrisma | any = prismaError(error)

    res
      .status(prismaErrorResponse?.http_status)
      .json({
        prisma_exception: prismaErrorResponse?.error_data,
        error_message: error.message,
        prisma_message: prismaErrorResponse?.error_message,
        http_status: prismaErrorResponse.http_status
      })
    return
  }

  // Zod Errors
  if (error instanceof z.ZodError) {
    res.status(StatusCodes.BAD_REQUEST).json({ zodError: error.issues })
    return
  }

  // JWT Exceptions
  if (
    error.name === 'TokenExpiredError' ||
    error.name === 'JsonWebTokenError' ||
    error.name === 'NotBeforeError'
  ) {
    console.error(
      `Jason Web token Error: ${error.message} --> The server still be online`
    ) // Only server LOG
    res
      .status(StatusCodes.FORBIDDEN)
      .json({
        code: 403,
        message: "The session can be expired or the credential wasn't provided"
      }) // Sending to the client --> code: 403
    return
  }

  error.statusCode = error.statusCode || error.httpCode || 500 // Internal ERROR
  error.status = error.status || 'error'

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message
  })

  console.error(
    `${error} ---> The current Error is here, Dumb!!!... The server still be online 🌐`
  )
  return
}
