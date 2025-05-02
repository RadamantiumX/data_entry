
// TODO: Adding TDD with JEST: https://jestjs.io/
import { describe, it, expect } from "vitest";
import app from "..";
import request from 'supertest'



describe("test", ()=> {
    it("should be work", ()=> {
        expect(true).toBe(true)
    })
})

describe("GET /", ()=>{
    it('should return 200 OK', async ()=> {
        const response = await request(app).get('/')
        expect(response.status).toBe(200)
         expect(response.body.message).toBe('server on')
    })

})

describe('POST /auth/signin', ()=>{
    it('should be UNAUTHORIZED', async ()=> {
        const mockUnauthorizedUser = {
            username: "fail_user",
            password: "12345679"
        }

        const response = await request(app)
          .post('/auth/signin')
          .send(mockUnauthorizedUser)
        
        expect(response.body.message).toBe('Username or password is wrong, code: 401')  
    })
})