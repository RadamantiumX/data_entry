import { prisma } from "../../db/prisma.db";
import { getTimestampParsed } from "../../helper/time.helper";
import { ApiKey, ApiKeyClientResponse } from "../../types/types";


/**
 * Create a new record ApiKey Prisma model record
 * @param {Omit<ApiKey, "id" | "createdAt" | "updatedAt" >} bodyRequest 
 * @returns {Promise<void>}
 */
export const createRecord = async (bodyRequest:Omit<ApiKey, "id" | "createdAt" | "updatedAt" >): Promise<void> => {
  // Save a new record
   await prisma.apiKeys.create({
    data:{
      apiKey: bodyRequest.apiKey,
      apiKeySecret: bodyRequest.apiKeySecret,
      bearerToken: bodyRequest.bearerToken,
      accessToken: bodyRequest.accessToken,
      accessTokenSecret: bodyRequest.accessTokenSecret,
      apiDataId: bodyRequest.apiDataId,
      dataId: bodyRequest.dataId
    }
  
 })
    return
}

/**
 * Return all records from the ApiKey Prisma model
 * @returns {Promise<ApiKeyClientResponse>} Collection of ApiKey (only selected fields) and the total count of tha
 */
export const readCountRecords = async ():Promise<ApiKeyClientResponse> => {
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
export const readRecord = async (paramRequest:Pick<ApiKey, "id">):Promise<Omit<ApiKey, "id" | "createdAt" | "updatedAt"> | null>  => {
  const apiKey = await prisma.apiKeys.findUnique({where:{id: paramRequest.id}, omit:{id:true, updatedAt: true, createdAt: true}})
  return apiKey
}

/**
 * Update the selected record from the provided id
 * @param {Omit<ApiKey, "createdAt" | "updatedAt">} bodyRequest 
 * @returns {Promise<void>}
 */
export const updateRecord = async (bodyRequest:Omit<ApiKey, "createdAt" | "updatedAt">):Promise<void> => {
 await prisma.apiKeys.update({
    where:{
      id: bodyRequest.id
    },
    data:{
      apiKey: bodyRequest.apiKey,
      apiKeySecret: bodyRequest.apiKeySecret,
      bearerToken: bodyRequest.bearerToken,
      accessToken: bodyRequest.accessToken,
      accessTokenSecret: bodyRequest.accessTokenSecret,
      updatedAt: getTimestampParsed()
    }
  })

  return
}

/**
 * Delete a single record from the ApiKey Prisma model
 * @param {Pick<ApiKey, "id">} bodyRequest Take the id from the model
 * @returns {Promise<void>}
 */
export const destroyRecord = async (bodyRequest:Pick<ApiKey, "id">):Promise<void> => {
   await prisma.apiKeys.delete({where:{id: bodyRequest.id}})
   return
}