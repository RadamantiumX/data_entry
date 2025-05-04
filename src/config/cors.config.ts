import { ALLOWED_ORGINS } from '../constants/index.constants'
import { AppError } from '../manage_exceptions/custom.error'

///// TODO: Adding allowed origins

export const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (ALLOWED_ORGINS.indexOf(origin ? origin : '') !== -1 || !origin) {
      callback(null, true) // Set null ERROR and allowed enter
    } else {
      callback(
        new AppError(
          'Forbidden Origin',
          403,
          'This origin is not allowed',
          false
        )
      )
    }
  }
}
