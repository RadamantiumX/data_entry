 export type PrismaErrorType = {
       name: Name;
       code: string;
       clientVersion: string;
       meta: Meta
  }
  
export enum Name {
    PrismaClientKnownRequestError = "PrismaClientKnownRequestError",
    PrismaClientUnknownRequestError = "PrismaClientUnknownRequestError",
    PrismaClientRustPanicError = "PrismaClientRustPanicError",
    PrismaClientInitializationError = "PrismaClientInitializationError",
    PrismaClientValidationError = "PrismaClientValidationError"
}

  export type Meta = {
     modelName: string;
     target: string[]
  }