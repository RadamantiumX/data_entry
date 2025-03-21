import { ApiData } from "../types/types"
import { prisma } from "../db/prisma.db"
import bcrypt from 'bcryptjs'


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

export const readCountRecords = () => {

}

export const updateRecord = () => {

}

export const destroyRecord = () => {

}