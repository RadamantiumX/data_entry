import { Prisma } from "@prisma/client";
import type { PrismaErrorType } from "../types/error";
import { PRISMA_ERROR_CODES } from "./prisma_errors_codes/prisma.codes";

// TODO: set the error code using the arguments
// TODO: Look at this to guidance: https://www.toptal.com/nodejs/node-js-error-handling
// Read Prisma docs: https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/handling-exceptions-and-errors

export const prismaError = (error:any) => {
   for(const [key, value] of Object.entries(PRISMA_ERROR_CODES)){
     if(key === error.code){
        return { error_data: error, error_message: value }
     }
   }
}