import { prisma } from "../../db/prisma.db";
import { getTimestampParsed } from "../../helper/time.helper";
import { Datum, DatumClientResponse, AllRelatedData } from "../../types/types";

/**
 * Create a new record from the Datum Prisma model
 * @param {Omit<Datum, "id" | "createdAt" | "updatedAt">} bodyRequest 
 * @returns {Promise<void>}
 */
export const createRecord = async (bodyRequest:Omit<Datum, "id" | "createdAt" | "updatedAt">):Promise<void> => {
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


/**
 * Return all records from Datum Prisma model, only selected fields
 * @returns {Promise<DatumClientResponse>}
 */
export const readCountRecords = async ():Promise<DatumClientResponse> => {
    const [data, totalData] = await prisma.$transaction([
        prisma.data.findMany({omit:{ createdAt: true, updatedAt: true}, orderBy: {createdAt: 'desc'}}), // Descendent order by the timestamp "createdAt"
        prisma.data.count()
      ])
    
      return {data, totalData}
}


/**
 * Return a single record from the Datum Prisma model, only selected fields
 * @param {Pick<Datum, "id">} paramRequest 
 * @returns {Promise<Omit<Datum, "createdAt"| "updatedAt"> | null > }
 */
export const readRecord = async (paramRequest:Pick<Datum, "id">):Promise<Omit<Datum, "createdAt"| "updatedAt"> | null >  => {
    const singleData = await prisma.data.findUnique({where:{id: paramRequest.id}, omit:{ updatedAt: true, createdAt: true}})
    return singleData
}


/**
 * Return a unique register on the Prisma model Datum, using the "emailSource", return only selected fields
 * @param {Pick<Datum, "emailSource">} paramRequest emailSource unique on table
 * @returns {Promise<Omit<Datum, "createdAt"| "updatedAt"> | null >}
 */
export const readUniqueEmail = async (paramRequest:Pick<Datum, "emailSource">):Promise<Omit<Datum, "createdAt"| "updatedAt"> | null > => {
  const singleData = await prisma.data.findUnique({where: {emailSource: paramRequest.emailSource}, omit: {updatedAt: true, createdAt: true}})
  return singleData
  
}

/**
 * Return all related data from all models --Apidata | ApiKeys | Datum-- and relations
 * @returns {:Promise<AllRelatedData []>}
 */
export const readAllRelated = async ():Promise<AllRelatedData []> =>{
     // Select the record and nested data (ApiData & ApiKey)
     const allRecords = await prisma.data.findMany({ select:{id:true, emailSource: true, emailSourcePsw: true, xUser: true, xPsw:true ,
      apiData:{      
       select:{
       appName: true, appId: true
     }}, 
     apiKeys:{
       select:{
       apiKey: true, apiKeySecret: true, bearerToken: true, accessToken: true, accessTokenSecret: true
      }
  } }})
  return allRecords
}

/**
 * Udpate a selected record from the Datum Prisma model
 * @param {Omit<Datum, "updatedAt" | "createdAt">} bodyRequest 
 * @returns {Promise<void>}
 */
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

/**
 * Delete a current record from the Datum Prisma model
 * @param {Pick<Datum, "id">} bodyRequest 
 * @returns {Promise<void>}
 */
export const destroyRecord = async (bodyRequest:Pick<Datum, "id">):Promise<void> => {
    await prisma.data.delete({where:{id: bodyRequest.id}})
    return
}