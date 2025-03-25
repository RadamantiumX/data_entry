import z from 'zod'
import { UserColab } from '../types/types'


const userSchema = z.object({
    username: z.string({
        required_error: 'The nickname is riquired'
    }).min(8, {
        message: 'The nickname must be larger than 8 characters minimum'
    }),
    password: z.string({
        required_error: 'The password is riquered'
    }).min(8, {message: 'The password must be at 8 characters minimum'}),
    isSuperAdmin: z.boolean().nullable()
}).required()

export function validateUser(input:Pick<UserColab, "username" | "password" | "isSuperAdmin">) {
       if(!userSchema.safeParse(input).success){
        throw new Error()
       }
        return userSchema.safeParse(input)
}