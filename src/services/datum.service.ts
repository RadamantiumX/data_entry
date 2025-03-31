import { DatumQuerys } from "../dal/prisma_querys/datum.query";
import { Datum, DatumClientResponse } from "../types/types";
import { validateDatum } from "../schemas/datum.validation";

export class DatumService{
    static async createDatum(){
       await validateDatum()
    }
    static async getAllDatum(){
        
    }
    static async getDatum(){
        
    }
    static async getUniqueEmailSourceDatum(){

    }
    static async getAllRelated(){

    }
    static async updateDatum(){
        
    }
    static async destroyDatum(){
        
    }
}