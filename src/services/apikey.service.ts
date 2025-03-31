import { ApiKeyQuerys } from "../dal/prisma_querys/apikey.querys";
import { validateApiKey } from "../schemas/apiKey.validation";
import { ApiKey, ApiKeyClientResponse } from "../types/types";

export class ApiKeyService{
    static async createApiKey(bodyReq:Omit<ApiKey, "id" | "createdAt" | "updatedAt" >):Promise<void>{
          await validateApiKey(bodyReq)
          await ApiKeyQuerys.createRecord(bodyReq)
          return
    }
    static async getAllApiKey():Promise<ApiKeyClientResponse>{
        const allApikey = await ApiKeyQuerys.readCountRecords()
        return allApikey
    }
    static async getApiKey(paramReq:Pick<ApiKey, "id">):Promise<Omit<ApiKey, "id" | "createdAt" | "updatedAt"> | null>{
        const apiKey = await ApiKeyQuerys.readRecord(paramReq)
        return apiKey
    }
    static async updateApiKey(bodyReq:Omit<ApiKey, "createdAt" | "updatedAt">):Promise<void>{
        await validateApiKey(bodyReq)
        await ApiKeyQuerys.updateRecord(bodyReq)
        return
    }
    static async destroyApiKey(bodyReq:Pick<ApiKey, "id">):Promise<void>{
        await ApiKeyQuerys.destroyRecord(bodyReq)
        return
    }
}