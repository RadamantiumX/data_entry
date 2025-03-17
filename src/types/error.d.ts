 export interface PrismaErrorType  {
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

 export interface SendingErrorPrisma extends PrismaErrorType{
    error_data: string;
    error_message: string;
    http_status: number;
     
 }


export type HttpCode = 200 | 300 | 400 | 401 | 404 | 500 | 501