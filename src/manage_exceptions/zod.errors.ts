import { ZodErrorIssuesType } from "../types/error"
// Only for test
// TODO: Using the ARRAY content to send teh response
export const zodErrorIssues = (errorIssues: ZodErrorIssuesType [] | any []) => {
    for(let i = 0; i< errorIssues.length; i++){
        return {message: errorIssues[i].message}
    }
    return
}