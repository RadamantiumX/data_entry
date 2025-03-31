import { ApiData, ApiDataClientResponse } from "../../types/types"
import { prisma } from "../../db/prisma.db"
import { getTimestampParsed } from "../../helper/time.helper"


export class ApiDataQuerys{
  /**
 * Create a new record ApiData Prisma model record
 * @param {Pick<ApiData, "appName" | "appId" | "dataId">} payload 
 * @returns {Promise<void>}
 */
static async createRecord  (payload:Pick<ApiData, "appName" | "appId" | "dataId">):Promise<void> {

    // Save new record on DB  
     await prisma.apiData.create({
        data: {
          appName: payload.appName,
          appId: payload.appId,
          dataId: payload.dataId,
        },
      })

      return

}

/**
 * Return all records from the ApiData Prisma model
 * @returns {Promise<ApiDataClientResponse | null>} Collection of ApiData (only selected fields) and the total count of that
 */
static async readCountRecords ():Promise<ApiDataClientResponse | null> {
  const [apiDatas, totalApiData] = await prisma.$transaction([
    prisma.apiData.findMany({select:{appName: true, appId: true, dataId: true}, orderBy: {createdAt: 'desc'}}),
    prisma.apiData.count()
  ])

  return {apiDatas, totalApiData}
}

/**
 * Return a single from the ApiData Prisma model
 * @param {Pick<ApiData, "id">} paramRequest Take the id from the ApiData Prisma model
 * @returns {Promise<Pick<ApiData, "appName" | "appId" | "dataId"> | null>} A single record and, only selected fields
 */
static async readRecord (paramRequest:Pick<ApiData, "id">):Promise<Pick<ApiData, "appName" | "appId" | "dataId"> | null>  {
  const apidata = await prisma.apiData.findUnique({where:{id: paramRequest.id}, select: {appName: true, appId: true, dataId: true}})
  return apidata
}

/**
 * Update the selected record from the provided id
 * @param {Pick<ApiData, "id" | "appName" | "appId" | "dataId">} payload 
 * @returns {Promise<void>}
 */
 static async updateRecord  (payload:Pick<ApiData, "id" | "appName" | "appId" | "dataId">):Promise<void> {
   await prisma.apiData.update({
    where: {id: payload.id},
    data:{
       appName: payload.appName,
       appId: payload.appId,
       dataId: payload.dataId,
       updatedAt: getTimestampParsed()
    }
   })

   return
}

/**
 * Delete a single record from the ApiData Prisma model
 * @param {Pick<ApiData, "id">} payload Take the id from the model
 * @returns {Promise<void>}
 */
 static async destroyRecord (payload:Pick<ApiData, "id">):Promise<void> {
  await prisma.apiData.delete({where:{id:payload.id}})
  return
}
}

