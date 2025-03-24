import { prisma } from "../../db/prisma.db";
import { getTimestampParsed } from "../../helper/time.helper";
import { Datum, DatumClientResponse } from "../../types/types";

export const createRecord = async (bodyRequest:Omit<Datum, "id" | "createdAt" | "updatedAt">) => {
 // Save a new record
 await prisma.data.create({
    data:{
      emailSource: bodyRequest.emailSource,
      emailSourcePsw: bodyRequest.emailSourcePsw,
      xUser: bodyRequest.xUser,
      xPsw: bodyRequest.xPsw,
      userColabId: bodyRequest.userColabId
    }
  
 })
    return
}

export const readCountRecords = async ():Promise<DatumClientResponse> => {
    const [data, totalData] = await prisma.$transaction([
        prisma.data.findMany({omit:{ createdAt: true, updatedAt: true}, orderBy: {createdAt: 'desc'}}),
        prisma.data.count()
      ])
    
      return {data, totalData}
}

export const readRecord = async (paramRequest:Pick<Datum, "id">):Promise<Omit<Datum, "id" |"createdAt"| "updatedAt"> | null >  => {
    const singleData = await prisma.data.findUnique({where:{id: paramRequest.id}, omit:{id:true, updatedAt: true, createdAt: true}})
    return singleData
}

export const updateRecord = async (bodyRequest:Omit<Datum, "updatedAt" | "createdAt">):Promise<void> => {
    await prisma.data.update({
        where:{
          id: bodyRequest.id
        },
        data:{
            emailSource: bodyRequest.emailSource,
            emailSourcePsw: bodyRequest.emailSourcePsw,
            xUser: bodyRequest.xUser,
            xPsw: bodyRequest.xPsw,
            userColabId: bodyRequest.userColabId,
            updatedAt: getTimestampParsed()
        }
      })
    
      return
}

export const destroyRecord = async (bodyRequest:Pick<Datum, "id">):Promise<void> => {
    await prisma.data.delete({where:{id: bodyRequest.id}})
    return
}