import { DatumQuerys } from '../dal/prisma_querys/datum.query'
import { Datum, DatumClientResponse, AllRelatedData } from '../types/types'
import { validateDatum } from '../schemas/datum.validation'

// ❗ Errors on validations can handle on "schemas"
export class DatumService {
  /**
   * Service for create a new Datum record, all "admin" allowed
   * @param {Omit<Datum, "id" | "createdAt" | "updatedAt">} bodyReq
   * @returns {Promise<void>}
   */
  static async createDatum(
    bodyReq: Omit<Datum, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<void> {
    await validateDatum(bodyReq)
    await DatumQuerys.createRecord(bodyReq)
    return
  }

  /**
   * Service to get all Datum records (only selected fields)
   * @returns {Promise<DatumClientResponse>} Return an ARRAY of Datum records (only selected fields)
   */
  static async getAllDatum(): Promise<DatumClientResponse> {
    const allDatum = await DatumQuerys.readCountRecords()
    return allDatum
  }

  /**
   * Service for get a selected Datum record (only selected fields), all "admin" allowed
   * @param {Pick<Datum, "id">} paramReq
   * @returns {Promise<Omit<Datum, "createdAt"| "updatedAt"> | null >} Return an object from Datum (only selected fields)
   */
  static async getDatum(
    paramReq: Pick<Datum, 'id'>
  ): Promise<Omit<Datum, 'createdAt' | 'updatedAt'> | null> {
    const datum = await DatumQuerys.readRecord(paramReq)
    return datum
  }

  /**
   * Service for get a selected record using the emailSource provided, all "admin" allowed
   * @param {Pick<Datum, "emailSource">} paramReq
   * @returns {Promise<Omit<Datum, "createdAt"| "updatedAt"> | null >} Return an object with the Datum selected (only selected fields)
   */
  static async getUniqueEmailSourceDatum(
    paramReq: Pick<Datum, 'emailSource'>
  ): Promise<Omit<Datum, 'createdAt' | 'updatedAt'> | null> {
    const searchResult = await DatumQuerys.readUniqueEmailSourceRecord(paramReq)
    return searchResult
  }

  /**
   * Service for get all related Data, with all tables on current DB (UserColab no included), all "admin" allowed
   * @returns {Promise<AllRelatedData []> } Return an Array with all Datum and related tables (only selected fields)
   */
  static async getAllRelated(): Promise<AllRelatedData[]> {
    const allRealated = await DatumQuerys.readAllRelatedRecords()
    return allRealated
  }

  /**
   * Service for update a Datum record, the "id" is required
   * @param {Omit<Datum, "updatedAt" | "createdAt">} bodyReq
   * @returns {Promise<void>}
   */
  static async updateDatum(
    bodyReq: Omit<Datum, 'updatedAt' | 'createdAt'>
  ): Promise<void> {
    await validateDatum(bodyReq)
    await DatumQuerys.updateRecord(bodyReq)
    return
  }

  /**
   * Service for delete a Datum record, the "id" is required
   * @param {Pick<Datum, "id">} bodyReq
   * @returns {Promise<void>}
   */
  static async destroyDatum(bodyReq: Pick<Datum, 'id'>): Promise<void> {
    await DatumQuerys.destroyRecord(bodyReq)
    return
  }
}
