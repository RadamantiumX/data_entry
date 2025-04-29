// TODO: Adding TDD with JEST: https://jestjs.io/
import { describe, it, expect } from "vitest";
import { mainApp } from "../app";
import request from 'supertest'

describe("test", ()=> {
    it("should be work", ()=> {
        expect(true).toBe(true)
    })
})

describe("GET /", ()=>{
    it('should return 200 OK', async ()=> {
        const response = await request(mainApp).get('/')
    })
})