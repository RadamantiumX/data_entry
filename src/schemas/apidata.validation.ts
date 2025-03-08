import z from 'zod'
import { ApiData } from '../types/types'

const apidataSchema = z.object({
    appName: z.string({
        required_error: 'This field is required'
    }),
    appId: z.string({
        required_error: 'This field is required'
    }),
    dataId: z.number({
        required_error: 'This field is required'
    })
}).required()

export function validateApiData(input:Pick<ApiData, "appName" | "appId" | "dataId">) {
    return apidataSchema.safeParse(input)
}