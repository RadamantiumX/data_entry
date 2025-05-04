import z from 'zod'
import { ApiData } from '../types/types'

/**
 * ApiData Model Inputs validations
 */
const apidataSchema = z
  .object({
    appName: z.string({
      required_error: 'This field is required'
    }),
    appId: z.string({
      required_error: 'This field is required'
    }),
    dataId: z.number({
      required_error: 'This field is required'
    })
  })
  .required()

export async function validateApiData(
  input: Pick<ApiData, 'appName' | 'appId' | 'dataId'>
) {
  const parseSync = await apidataSchema.safeParseAsync(input)
  if (!parseSync.success) {
    throw parseSync.error
  }
  return parseSync
}
