import { prisma } from "../../db/prisma.db";
import { getTimestampParsed } from "../../helper/time.helper";
import { ApiKey, ApiKeyClientResponse } from "../../types/types";


export class ApiKeyQuerys{
  /**
 * Create a new record ApiKey Prisma model record
 * @param {Omit<ApiKey, "id" | "createdAt" | "updatedAt" >} payload 
 * @returns {Promise<void>}
 */
  static async createRecord (payload:Omit<ApiKey, "id" | "createdAt" | "updatedAt" >): Promise<void>{
  // Save a new record
   await prisma.apiKeys.create({
    data:{
      apiKey: payload.apiKey,
      apiKeySecret: payload.apiKeySecret,
      bearerToken: payload.bearerToken,
      accessToken: payload.accessToken,
      accessTokenSecret: payload.accessTokenSecret,
      apiDataId: payload.apiDataId,
      dataId: payload.dataId
    }
  
 })
    return
}

/**
 * Return all records from the ApiKey Prisma model
 * @returns {Promise<ApiKeyClientResponse>} Collection of ApiKey (only selected fields) and the total count of tha
 */
  static async readCountRecords ():Promise<ApiKeyClientResponse>{
    const [apiKeys, totalApiKeys] = await prisma.$transaction([
        prisma.apiKeys.findMany({omit:{id: true, createdAt: true, updatedAt: true}, orderBy: {createdAt: 'desc'}}),
        prisma.apiKeys.count()
      ])
    
      return {apiKeys, totalApiKeys}
}

/**
 * Return a single from the ApiKey Prisma model
 * @param {Pick<ApiKey, "id">} paramRequest Take the id from the ApiKey Prisma model
 * @returns {Promise<Omit<ApiKey, "id" | "createdAt" | "updatedAt"> | null>} A single record and, only selected fields
 */
static async readRecord (paramRequest:Pick<ApiKey, "id">):Promise<Omit<ApiKey, "id" | "createdAt" | "updatedAt"> | null> {
  const apiKey = await prisma.apiKeys.findUnique({where:{id: paramRequest.id}, omit:{id:true, updatedAt: true, createdAt: true}})
  return apiKey
}

/**
 * Update the selected record from the provided id
 * @param {Omit<ApiKey, "createdAt" | "updatedAt">} payload 
 * @returns {Promise<void>}
 */
 static async updateRecord (payload:Omit<ApiKey, "createdAt" | "updatedAt">):Promise<void> {
 await prisma.apiKeys.update({
    where:{
      id: payload.id
    },
    data:{
      apiKey: payload.apiKey,
      apiKeySecret: payload.apiKeySecret,
      bearerToken: payload.bearerToken,
      accessToken: payload.accessToken,
      accessTokenSecret: payload.accessTokenSecret,
      updatedAt: getTimestampParsed()
    }
  })

  return
}

/**
 * Delete a single record from the ApiKey Prisma model
 * @param {Pick<ApiKey, "id">} payload Take the id from the model
 * @returns {Promise<void>}
 */
static async destroyRecord (payload:Pick<ApiKey, "id">):Promise<void> {
   await prisma.apiKeys.delete({where:{id: payload.id}})
   return
}
}

