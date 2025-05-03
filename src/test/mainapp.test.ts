
// TODO: Adding TDD with JEST: https://jestjs.io/
import { describe, it, expect } from "vitest";
import app from "..";
import request from 'supertest'



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


/**
 * Testing routes without provided token...
 * The response must be 403 FORBIDDEN
*/
describe('POST /***  Protected Routes', ()=>{
    it('should be Forbidden to enter', async ()=> {
       

        const response = await request(app)
          .post('/datum')
          
        
        expect(response.body.message).toBe('The session can be expired or the credential wasn\'t provided')  
    })
    it('should be Forbidden to enter', async ()=> {
       

        const response = await request(app)
          .post('/apiData')
          
        
        expect(response.body.message).toBe('The session can be expired or the credential wasn\'t provided')  
    })

    it('should be Forbidden to enter', async ()=> {
       

        const response = await request(app)
          .post('/apiKey')
          
        
        expect(response.body.message).toBe('The session can be expired or the credential wasn\'t provided')  
    })

    it('should be Forbidden to enter', async ()=> {
       

        const response = await request(app)
          .post('/refreshToken')
          
        
        expect(response.body.message).toBe('The session can be expired or the credential wasn\'t provided')  
    })
    it('should be Forbidden to enter', async ()=> {
       

        const response = await request(app)
          .post('/user')
          
        
        expect(response.body.message).toBe('The session can be expired or the credential wasn\'t provided')  
    })
})