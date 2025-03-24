import { ApiData } from "../../types/types"
import { prisma } from "../../db/prisma.db"
import { getTimestampParsed } from "../../helper/time.helper"


export const createRecord = async (bodyRequest:Pick<ApiData, "appName" | "appId" | "dataId">):Promise<void> => {

    // Save new record on DB  
     await prisma.apiData.create({
        data: {
          appName: bodyRequest.appName,
          appId: bodyRequest.appId,
          dataId: bodyRequest.dataId,
        },
      })

      return

}

export const readCountRecords = async () => {
  const [apidatas, totalApiData] = await prisma.$transaction([
    prisma.apiData.findMany({select:{appName: true, appId: true, dataId: true}, orderBy: {createdAt: 'desc'}}),
    prisma.apiData.count()
  ])

  return {apidatas, totalApiData}
}

export const readRecord = async (paramRequest:Pick<ApiData, "id">):Promise<Pick<ApiData, "appName" | "appId" | "dataId"> | null>  => {
  const apidata = await prisma.apiData.findUnique({where:{id: paramRequest.id}, select: {appName: true, appId: true, dataId: true}})
  return apidata
}

export const updateRecord = async (bodyRequest:Pick<ApiData, "id" | "appName" | "appId" | "dataId">):Promise<void> => {
   await prisma.apiData.update({
    where: {id: bodyRequest.id},
    data:{
       appName: bodyRequest.appName,
       appId: bodyRequest.appId,
       dataId: bodyRequest.dataId,
       updatedAt: getTimestampParsed()
    }
   })

   return
}

export const destroyRecord = async (bodyRequest:Pick<ApiData, "id">):Promise<void> => {
  await prisma.apiData.delete({where:{id:bodyRequest.id}})
  return
}