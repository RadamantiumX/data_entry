import { validateApiData } from '../schemas/apidata.validation'
import { ApiDataQuerys } from '../dal/prisma_querys/apidata.querys'
import { ApiData, ApiDataClientResponse } from '../types/types'

// ❗ Errors on validations can handle on "schemas"

export class ApiDataService {
  /**
   * Service for create a new ApiData, all "admin" allowed
   * @param {Pick<ApiData, "appName" |  "appId" | "dataId">} bodyReq
   * @returns {Promise<void>}
   */
  static async createApiData(
    bodyReq: Pick<ApiData, 'appName' | 'appId' | 'dataId'>
  ): Promise<void> {
    await validateApiData(bodyReq)
    await ApiDataQuerys.createRecord(bodyReq)
    return
  }

  /**
   * Service for get all ApiData records, all "admin" allowed
   * @returns {Promise<ApiDataClientResponse | null>} Return an ARRAY of all records (only selected fields)
   */
  static async getAllApiData(): Promise<ApiDataClientResponse | null> {
    const allApiData = await ApiDataQuerys.readCountRecords()
    return allApiData
  }

  /**
   * Service for get a single ApiData record, the "id" is required, all "admin" allowed
   * @param {Pick<ApiData, "id">} paramReq
   * @returns {Promise<Pick<ApiData, "appName" | "appId" | "dataId"> | null>} Returns a Object for ApiData Record (only selected fields)
   */
  static async getApiData(
    paramReq: Pick<ApiData, 'id'>
  ): Promise<Pick<ApiData, 'appName' | 'appId' | 'dataId'> | null> {
    const apiData = await ApiDataQuerys.readRecord(paramReq)
    return apiData
  }

  /**
   * Service for update a single ApiData Record, the "id" is required in this process, all "admin" allowed
   * @param {Pick<ApiData, "id" | "appName" | "appId" | "dataId">} bodyReq
   * @returns
   */
  static async updateApiData(
    bodyReq: Pick<ApiData, 'id' | 'appName' | 'appId' | 'dataId'>
  ): Promise<void> {
    await validateApiData(bodyReq)
    await ApiDataQuerys.updateRecord(bodyReq)
    return
  }

  /**
   * Service for delete a selected ApiData record, all "admin" allowed
   * @param bodyReq
   * @returns {Promise<void>}
   */
  static async destroyApiData(bodyReq: Pick<ApiData, 'id'>): Promise<void> {
    await ApiDataQuerys.destroyRecord(bodyReq)
    return
  }
}
