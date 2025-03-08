import z from 'zod'
import { Datum } from '../types/types'


const datumSchema = z.object({
    emailSource: z.string({
        required_error: 'This field is required'
    }).email({message: 'Must be a valid email address'}),
    emailSourcePsw: z.string({
        required_error: 'This field is required'
    }),
    xUser: z.string({
        required_error: 'This field is required'
    }),
    xPsw: z.string({
        required_error: 'This field is required'
    })
}).required()

export function validateDatum(input:Pick<Datum, "emailSource" | "emailSourcePsw" | "xUser" | "xPsw">) {
    return datumSchema.safeParse(input)
}