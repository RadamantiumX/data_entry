import { prisma } from "../../db/prisma.db";
import { getTimestampParsed } from "../../helper/time.helper";
import { ApiKey, ApiKeyClientResponse } from "../../types/types";



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

export const readCountRecords = async ():Promise<ApiKeyClientResponse> => {
    const [apiKeys, totalApiKeys] = await prisma.$transaction([
        prisma.apiKeys.findMany({omit:{id: true, createdAt: true, updatedAt: true}, orderBy: {createdAt: 'desc'}}),
        prisma.apiKeys.count()
      ])
    
      return {apiKeys, totalApiKeys}
}

export const readRecord = async (bodyRequest:Pick<ApiKey, "id">):Promise<Omit<ApiKey, "id" | "createdAt" | "updatedAt"> | null>  => {
  const apiKey = await prisma.apiKeys.findUnique({where:{id: bodyRequest.id}, omit:{id:true, updatedAt: true, createdAt: true}})
  return apiKey
}

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

export const destroyRecord = async (bodyRequest:Pick<ApiKey, "id">):Promise<void> => {
   await prisma.apiKeys.delete({where:{id: bodyRequest.id}})
   return
}