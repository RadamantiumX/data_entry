import { DatumQuerys } from "../dal/prisma_querys/datum.query";
import { Datum, DatumClientResponse, AllRelatedData } from "../types/types";
import { validateDatum } from "../schemas/datum.validation";

export class DatumService{
    static async createDatum(bodyReq:Omit<Datum, "id" | "createdAt" | "updatedAt">):Promise<void>{
       await validateDatum(bodyReq)
       await DatumQuerys.createRecord(bodyReq)
       return
    }
    static async getAllDatum():Promise<DatumClientResponse> {
        const allDatum = await DatumQuerys.readCountRecords()
        return allDatum
    }
    static async getDatum(paramReq:Pick<Datum, "id">):Promise<Omit<Datum, "createdAt"| "updatedAt"> | null > {
        const datum = await DatumQuerys.readRecord(paramReq)
        return datum
    }
    static async getUniqueEmailSourceDatum(paramReq:Pick<Datum, "emailSource">):Promise<Omit<Datum, "createdAt"| "updatedAt"> | null >{
       const searchResult = await DatumQuerys.readUniqueEmailSourceRecord(paramReq)
       return searchResult
    }
    static async getAllRelated():Promise<AllRelatedData []> {
      const allRealated = await DatumQuerys.readAllRelatedRecords()
      return allRealated
    }
    static async updateDatum(bodyReq:Omit<Datum, "updatedAt" | "createdAt">):Promise<void>{
        await validateDatum(bodyReq)
        await DatumQuerys.updateRecord(bodyReq)
        return
    }
    static async destroyDatum(bodyReq:Pick<Datum, "id">):Promise<void>{
        await DatumQuerys.destroyRecord(bodyReq)
        return
    }
}