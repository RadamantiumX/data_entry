import { Prisma } from "@prisma/client";
import type { PrismaErrorType } from "../types/error";

// TODO: set the error code using the arguments
// TODO: Look at this to guidance: https://www.toptal.com/nodejs/node-js-error-handling
// Read Prisma docs: https://www.prisma.io/docs/orm/prisma-client/debugging-and-troubleshooting/handling-exceptions-and-errors

export const prismaError = (error:PrismaErrorType) => {
   
}