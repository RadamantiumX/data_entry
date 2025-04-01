import { ApiKeyQuerys } from "../dal/prisma_querys/apikey.querys";
import { validateApiKey } from "../schemas/apiKey.validation";
import { ApiKey, ApiKeyClientResponse } from "../types/types";

// ❗ Errors on validations can handle on "schemas"

export class ApiKeyService{
    /**
     * Service for create a new ApiKey, all "admin" allowed
     * @param bodyReq 
     * @returns {Promise<void>}
     */
    static async createApiKey(bodyReq:Omit<ApiKey, "id" | "createdAt" | "updatedAt" >):Promise<void>{
          await validateApiKey(bodyReq)
          await ApiKeyQuerys.createRecord(bodyReq)
          return
    }

    /**
     * Service for get all ApiData Records, all "admin" allowed
     * @returns {Promise<ApiKeyClientResponse>} Return an ARRAY of ApiData records (only selected fields)
     */
    static async getAllApiKey():Promise<ApiKeyClientResponse>{
        const allApikey = await ApiKeyQuerys.readCountRecords()
        return allApikey
    }

    /**
     * Service for get a single ApiKey records, all "admin" allowed
     * @param paramReq 
     * @returns {Promise<Omit<ApiKey, "id" | "createdAt" | "updatedAt"> | null>} Return a object contains ApiKey (only selected fields)
     */
    static async getApiKey(paramReq:Pick<ApiKey, "id">):Promise<Omit<ApiKey, "id" | "createdAt" | "updatedAt"> | null>{
        const apiKey = await ApiKeyQuerys.readRecord(paramReq)
        return apiKey
    }

    /**
     * Service for update a single ApiKey record, all "admin" allowed
     * @param bodyReq 
     * @returns {Promise<void>}
     */
    static async updateApiKey(bodyReq:Omit<ApiKey, "createdAt" | "updatedAt">):Promise<void>{
        await validateApiKey(bodyReq)
        await ApiKeyQuerys.updateRecord(bodyReq)
        return
    }

    /**
     * Service for destroy a seleted ApiKey record
     * @param bodyReq 
     * @returns {Promise<void}
     */
    static async destroyApiKey(bodyReq:Pick<ApiKey, "id">):Promise<void>{
        await ApiKeyQuerys.destroyRecord(bodyReq)
        return
    }
}