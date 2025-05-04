import type { PrismaErrorType } from "../types/error";
import { PRISMA_ERROR_CODES_CLIENT_KNOW_REQUEST } from './prisma_errors_codes/p.codes';



///// TODO: set the error code using the arguments
///// TODO: Look at this to guidance: https://www.toptal.com/nodejs/node-js-error-handling
// Read Prisma docs: https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/handling-exceptions-and-errors

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prismaError = (error:PrismaErrorType | any) => {
   for(const [key, value] of Object.entries(PRISMA_ERROR_CODES_CLIENT_KNOW_REQUEST)){
     if(key === error.code){
        return { http_status: value.httpCode, error_data: error, error_message: value.message }
     }
   }

   return
}