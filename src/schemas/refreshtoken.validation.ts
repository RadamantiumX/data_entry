import z from 'zod'
import { PayloadRefreshToken } from '../types/types'

const refreshTokenSchema = z
  .object({
    refreshToken: z.string({
      required_error: 'This field is required'
    }),
    userColabId: z
      .string({ required_error: 'This field is required' })
      .length(36)
  })
  .required()

export async function validateRefreshToken(input: PayloadRefreshToken) {
  const parseSync = await refreshTokenSchema.safeParseAsync(input)
  if (!parseSync.success) {
    throw parseSync.error
  }
  return parseSync
}
