import z from 'zod'
import { UserColab } from '../types/types'

const userSchema = z
  .object({
    username: z
      .string({
        required_error: 'The nickname is riquired'
      })
      .min(8, {
        message: 'The nickname must be larger than 8 characters minimum'
      }),
    password: z
      .string({
        required_error: 'The password is riquered'
      })
      .min(8, { message: 'The password must be at 8 characters minimum' }),
    isSuperAdmin: z.boolean().nullable()
  })
  .required()

export async function validateUser(
  input: Pick<UserColab, 'username' | 'password' | 'isSuperAdmin'>
) {
  const parseSync = await userSchema.safeParseAsync(input)
  if (!parseSync.success) {
    throw parseSync.error
  }
  return parseSync
}
