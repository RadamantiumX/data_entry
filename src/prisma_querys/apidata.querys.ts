import { ApiData } from "../types/types"
import { prisma } from "../db/prisma.db"


export const createRecord = async ({appName, appId, dataId}:Pick<ApiData, "appName" | "appId" | "dataId">):Promise<void> => {

    // Save new record on DB  
     await prisma.apiData.create({
        data: {
          appName: appName,
          appId: appId,
          dataId: dataId,
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

export const readRecord = async ({id}:Pick<ApiData, "id">):Promise<Pick<ApiData, "appName" | "appId" | "dataId"> | null>  => {
  const apidata = await prisma.apiData.findUnique({where:{id: id}, select: {appName: true, appId: true, dataId: true}})
  return apidata
}

export const updateRecord = async ({id, appName, appId, dataId}:Pick<ApiData, "id" | "appName" | "appId" | "dataId">):Promise<void> => {
   await prisma.apiData.update({
    where: {id: id},
    data:{
       appName: appName,
       appId: appId,
       dataId: dataId
    }
   })

   return
}

export const destroyRecord = async ({id}:Pick<ApiData, "id">):Promise<void> => {
  await prisma.apiData.delete({where:{id:id}})
  return
}