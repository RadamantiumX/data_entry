import z from 'zod'

const accessTokenSchema = z
  .object({
    refreshToken: z
      .string({
        required_error: 'This field is required'
      })
      .startsWith('Bearer ', {
        message: 'The provided credentials is invalid for authenticate'
      })
  })
  .required()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function validateAccessToken(input: any) {
  const parseSync = await accessTokenSchema.safeParseAsync(input)
  if (!parseSync.success) {
    throw parseSync.error
  }
  return parseSync
}
