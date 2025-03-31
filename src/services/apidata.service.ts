import { validateApiData } from "../schemas/apidata.validation";
import { ApiDataQuerys } from "../dal/prisma_querys/apidata.querys";

export class ApiDataService {
    static async createApiData(bodyReq):Promise<void>{
       await validateApiData(bodyReq)
       await ApiDataQuerys.createRecord(bodyReq)
       return
    }
    static async getAllApiData(){
        const allApiData = await ApiDataQuerys.readCountRecords()
        return allApiData
    }
    static async getApiData(paramReq){
        const apiData = await ApiDataQuerys.readRecord(paramReq)
        return  apiData
    }
    static async updateApiData(bodyReq):Promise<void>{
        await validateApiData(bodyReq)
        await ApiDataQuerys.updateRecord(bodyReq)
        return
    }
    static async destroyApiData(bodyReq):Promise<void>{
      await ApiDataQuerys.destroyRecord(bodyReq)
      return
    }
}