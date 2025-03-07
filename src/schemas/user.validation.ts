import z from 'zod'
import { UserColab } from '../types/types'


const userSchema = z.object({
    username: z.string({
        required_error: 'The nickname is riquired'
    }).min(8, {
        message: 'The nickname must be larger than 8 characters minimum'
    }),
    password: z.string().min(8, {message: 'The password must be at 8 characters minimum'})
})

export function validateUser(input:Pick<UserColab, "username" | "password">) {
    return userSchema.safeParse(input)
}