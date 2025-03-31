import { validateApiData } from "../schemas/apidata.validation";
import { ApiDataQuerys } from "../dal/prisma_querys/apidata.querys";
import { ApiData, ApiDataClientResponse } from "../types/types";

export class ApiDataService {
    static async createApiData(bodyReq:Pick<ApiData, "appName" |  "appId" | "dataId">):Promise<void>{
       await validateApiData(bodyReq)
       await ApiDataQuerys.createRecord(bodyReq)
       return
    }
    static async getAllApiData():Promise<ApiDataClientResponse | null>{
        const allApiData = await ApiDataQuerys.readCountRecords()
        return allApiData
    }
    static async getApiData(paramReq:Pick<ApiData, "id">):Promise<Pick<ApiData, "appName" | "appId" | "dataId"> | null>{
        const apiData = await ApiDataQuerys.readRecord(paramReq)
        return  apiData
    }
    static async updateApiData(bodyReq:Pick<ApiData, "id" | "appName" | "appId" | "dataId">):Promise<void>{
        await validateApiData(bodyReq)
        await ApiDataQuerys.updateRecord(bodyReq)
        return
    }
    static async destroyApiData(bodyReq:Pick<ApiData, "id">):Promise<void>{
      await ApiDataQuerys.destroyRecord(bodyReq)
      return
    }
}