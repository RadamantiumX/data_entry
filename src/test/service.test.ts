import { describe, it, expect } from "vitest";
import { AccessTokenService } from "../services/accesstoken.service";


describe('AccessTokenService', ()=>{


    it('should throw if validation fail', ()=>{
        expect(()=> AccessTokenService.checkOwnerCredentials('dsdasd')).toThrow
    })
})


