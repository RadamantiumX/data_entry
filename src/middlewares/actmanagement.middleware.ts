import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { AuthService } from '../services/auth.service'

/**
 * Middleware to manage authentication and authorization for "SUPER-ADMIN" action.
 * This function:
 *  - Validates the presence of an authorization token.
 *  - Decodes and verifies the JWT token.
 *  - Check if the associated user exists in the DB.
 *  - Ensures the user has SUPER-ADMIN privs before proceeding.
 *
 * @param {Request} req --> Incoming REQUEST
 * @param {Response} res --> RESPONSE object to the client
 * @param {NextFunction} next --> The NEXT middleware function.
 * @returns {Promise<void>} - Return voide or terminates with HTTP RESPONSE
 */

export const actManagement = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ code: 401, message: 'Unauthorized: Credentials not provided' })
    return
  }

  try {
    // Using the decoding object value to make a query
    const idAuth = await AuthService.authCredentialsVerify(authHeader)

    // Super Admin Check
    if (!idAuth?.isSuperAdmin) {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'Forbidden actions: LOW LEVEL CREDENTIALS' })

      return
    }

    next() // Next Middleware
  } catch (error) {
    return next(error)
  }
}
