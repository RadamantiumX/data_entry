import z from 'zod'
import { ApiKey } from '../types/types'

const apikeySchema = z
  .object({
    apiKey: z
      .string({
        required_error: 'This field is required'
      })
      .length(25, { message: 'The length must 25 characters exactly' }),
    apiKeySecret: z
      .string({
        required_error: 'This field is required'
      })
      .length(50, { message: 'The length must 50 characters exactly' }),
    bearerToken: z
      .string({
        required_error: 'This field is required'
      })
      .length(114, { message: 'The length must 114 characters exactly' }),
    accessToken: z
      .string({
        required_error: 'This field is required'
      })
      .length(50, { message: 'The length must 50 characters exactly' }),
    accessTokenSecret: z
      .string({
        required_error: 'This field is required'
      })
      .length(45, { message: 'The length must 45 characters exactly' }),
    apiDataId: z.number({
      required_error: 'This field is required'
    }),
    dataId: z.number({
      required_error: 'This field is required'
    })
  })
  .required()

export async function validateApiKey(
  input: Pick<
    ApiKey,
    | 'apiKey'
    | 'apiKeySecret'
    | 'bearerToken'
    | 'accessToken'
    | 'accessTokenSecret'
    | 'apiDataId'
    | 'dataId'
  >
) {
  const parseSync = await apikeySchema.safeParseAsync(input)
  if (!parseSync.success) {
    throw parseSync.error
  }
  return parseSync
}
