import { describe, it, expect } from "vitest";
import { AccessTokenService } from "../services/accesstoken.service";
import { RerfreshTokenService } from "../services/refreshtoken.service";


describe('AccessTokenService', ()=>{


    it('should throw if token is not a valid Access Token format', ()=>{
        expect(()=> AccessTokenService.checkOwnerCredentials('dsdasd')).toThrow
    })
})


describe("RefreshTokenService", ()=>{

      it('should throw if is not valid Access Token or UserColab ID', ()=>{
        expect(()=> RerfreshTokenService.createRefreshToken({refreshToken:"", userColabId:"sdsadasdasd"}) ).toThrow
      })

})