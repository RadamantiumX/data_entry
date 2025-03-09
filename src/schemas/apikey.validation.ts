import z from 'zod'
import { ApiKey } from '../types/types'

const apikeySchema = z.object({
    apiKey: z.string({  
        required_error: 'This field is required'
    }).length(25, {message: 'The length must 25 characters exactly'}),
    apiKeySecret: z.string({
        required_error: 'This field is required'
    }).length(50, {message: 'The length must 50 characters exactly'}),
    bearerToken: z.string({
        required_error: 'This field is required'
    }).length(114, {message: 'The length must 114 characters exactly'}),
    accessToken: z.string({
        required_error: 'This field is required'
    }).length(50, {message: 'The length must 50 characters exactly'}),
    accessTokenSecret: z.string({
        required_error: 'This field is required'
    }).length(45, {message: 'The length must 45 characters exactly'}),
}).required()

export function validateApiKey(input:Pick<ApiKey, "apiKey" | "apiKeySecret" | "bearerToken" | "accessToken" | "accessTokenSecret">) {
    return apikeySchema.safeParse(input)
}